import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Table, Col, Form, Nav, Tab, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPrescription,
  faLongArrowAltRight,
  faCaretLeft,
  faCaretRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { productActions } from "../../redux/actions/product.actions";
import { appointmentActions } from "../../redux/actions/appointment.actions";
import axios from "axios";
import ModalInteraction from "../../components/ModalInteraction";
import Select from "react-select";
import DiagnosisForm from "./DiagnosisForm";
import PaginationBar from "../../components/PaginationBar";

const frequencyOptions = [
  { value: "1-1-1", label: "1-1-1" },
  { value: "1-0-1", label: "1-0-1" },
  { value: "1-0-0", label: "1-0-0" },
];
const directionOptions = [
  { value: "before foods", label: "before foods" },
  { value: "after foods", label: "after foods" },
];

const DoctorPrescribing = ({ appointment, handleHide }) => {
  const [eventKey, setEventKey] = useState("first");
  const [patientInfo, setPatientInfo] = useState({
    patientHeight: "",
    patientWeight: "",
    temperature: "",
    pressure: "",
  });
  const [diagnosis, setDiagnosis] = useState([]);
  const handleChangeForm = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.id]: e.target.value });
  };
  const [pageNum, setPageNum] = useState(1);
  const products = useSelector((state) => state.product.products);
  const totalPages = useSelector((state) => state.product.totalPages);
  const [searchTerm, setSearchTerm] = useState(null);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.productsRequest(pageNum, null, null, query));
  }, [dispatch, pageNum, query]);
  const [cart, setCart] = useState({
    products: [],
  });
  const [showModalInteraction, setShowModalInteraction] = useState(false);
  const [interaction, setInteraction] = useState(null);
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };

  const checkInteraction = async () => {
    try {
      let arrayRxId = [];
      for (let item of cart.products) {
        if (item?.rxId) {
          arrayRxId = [...arrayRxId, item.rxId];
        }
      }
      console.log("array", arrayRxId);
      let stringURL = arrayRxId.join("+");
      console.log("string URL", stringURL);
      let res;
      if (stringURL) {
        //const res = await axios.get(
        //("https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=1046408+104206");
        //);
        res = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${stringURL}`
        );
      }

      console.log("res", res);
      if (res?.data?.fullInteractionTypeGroup[0]) {
        setInteraction(res.data.fullInteractionTypeGroup[0]);
      }
    } catch (err) {
      console.log("err", err);
    }
    setShowModalInteraction(true);
  };
  const handleAddToCart = (product) => {
    let newProducts;
    if (cart.products.length === 0) {
      newProducts = [...cart.products, { ...product, qty: 1 }];
    }
    if (cart.products.length !== 0) {
      let check = false;
      cart.products.map((item) => {
        if (item._id === product._id) {
          item.qty++;
          check = true;
        }
        return item;
      });
      if (check) {
        newProducts = [...cart.products];
      }
      if (!check) {
        newProducts = [...cart.products, { ...product, qty: 1 }];
      }
    }

    setCart({ products: newProducts });
  };
  const handleEmptyCart = (id) => {
    let newProducts = cart.products.filter((item) => item._id !== id);
    setCart({ products: newProducts });
  };
  const addQuantity = (id) => {
    let newProducts = cart.products.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart({ products: newProducts });
  };
  const subQuantity = (id) => {
    let newProducts = cart.products.map((item) =>
      item._id === id
        ? { ...item, qty: item.qty !== 1 ? item.qty - 1 : 1 }
        : item
    );
    setCart({ products: newProducts });
  };

  const handleSelected = (product, e) => {
    let newProducts = cart.products.map((item) =>
      item._id === product._id ? { ...item, frequency: e.value } : item
    );
    setCart({ products: newProducts });
  };
  const handleSelectedDirection = (product, e) => {
    let newProducts = cart.products.map((item) =>
      item._id === product._id ? { ...item, direction: e.value } : item
    );
    setCart({ products: newProducts });
  };

  const handleChangeDiagnosis = (newValue) => {
    const newDiagnosis = newValue.map((x) => x.value);
    setDiagnosis(newDiagnosis);
  };

  const handleUpdateAppointment = () => {
    dispatch(
      appointmentActions.updateAppointment(
        appointment._id,
        patientInfo,
        diagnosis,
        cart.products
      )
    );
    handleHide();
  };
  const handleCloseModalInteraction = () => {
    setInteraction(null);
    setShowModalInteraction(false);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  return (
    <div>
      <Row className='mt-5 bg-white m-1 pt-0 shadow rounded'>
        <Tab.Container
          id='left-tabs-example'
          defaultActiveKey='first'
          activeKey={eventKey}
          onSelect={(eventKey) => setEventKey(eventKey)}
        >
          <Col md={12} lg={12}>
            <Nav
              className='flex-row'
              fill
              activeKey={eventKey}
              onSelect={(eventKey) => setEventKey(eventKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey='first' className='tab-doctor'>
                  <h6 className='font-weight-bold'> 1. Diagnosis</h6>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second' className='tab-doctor'>
                  <h6 className='font-weight-bold'> 2. E- prescribing</h6>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='third' className='tab-doctor'>
                  <h6 className='font-weight-bold'>3. Add directions</h6>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={12} lg={12}>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <DiagnosisForm
                  handleChangeForm={handleChangeForm}
                  handleChangeDiagnosis={handleChangeDiagnosis}
                  handleKeySecond={() => setEventKey("second")}
                />
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Row className='mt-3'>
                  <Col lg={6} className='mx-0 px-0'>
                    <div className='px-3 mb-3'>
                      <Form
                        className='p-1 shadow-sm bg-light mb-1'
                        style={{ borderRadius: "0.3rem" }}
                        onSubmit={handleSubmitSearch}
                      >
                        <div className='bg-light seach-bar position-relative'>
                          <input
                            className='border-0 mr-2 bg-light search-bar-input'
                            placeholder='Search medicine'
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <button
                            className='btn btn-primary'
                            style={{
                              width: "50px",
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <FontAwesomeIcon icon='search' />
                          </button>
                        </div>
                      </Form>
                    </div>

                    <Table borderless className='doctor-table'>
                      <tbody>
                        {products.length &&
                          products.map((p) => (
                            <tr key={p._id}>
                              <td className='py-2' width='70%'>
                                <div class='py-1 d-flex flex-row align-items-center mb-2'>
                                  <img
                                    src={p.images && p.images[0]}
                                    class='rounded-circle'
                                    width='40'
                                    alt=''
                                  />
                                  <div class='d-flex flex-column ml-2'>
                                    <span class='d-block font-weight-bold'>
                                      {p.name.substring(0, 50)}
                                    </span>
                                    <small class='text-muted'>
                                      {p.ingredient}
                                    </small>
                                  </div>
                                </div>
                              </td>

                              <td className='py-2 text-right'>
                                <FontAwesomeIcon
                                  icon={faInfoCircle}
                                  className='text-muted mr-1'
                                  style={{ cursor: "pointer" }}
                                />

                                <button
                                  className='btn btn-sm btn-link'
                                  style={{ paddingTop: "0px" }}
                                  onClick={() => handleAddToCart(p)}
                                >
                                  <span
                                    className='ml-1 text-primary'
                                    style={{ fontSize: "14px" }}
                                  >
                                    Prescribe
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <div className='d-flex justify-content-between'>
                      <PaginationBar
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        selectedPage={pageNum - 1}
                      />
                    </div>
                  </Col>
                  <Col>
                    <Table>
                      <thead className='bg-light'>
                        <tr>
                          <th className='border-0'>
                            <FontAwesomeIcon icon={faPrescription} size='lg' />
                          </th>
                          <th className='border-0'>
                            <div className='text-uppercase pt-2'>Quantity</div>
                          </th>
                          <th className='border-0'>
                            <div className='text-uppercase pt-2'></div>
                          </th>
                          <th className='border-0'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart &&
                          cart.products.map((product, idx) => (
                            <tr key={idx}>
                              <th className='pl-0 border-0' scope='row'>
                                <div className='media align-items-center'>
                                  <img
                                    src={product?.images[0]}
                                    alt='...'
                                    width='50'
                                  />
                                  <div class='d-flex flex-column ml-2'>
                                    <span class='d-block font-weight-bold'>
                                      {product.name.substring(0, 50)}
                                    </span>
                                    <small class='text-muted'>
                                      {product.ingredient}
                                    </small>{" "}
                                    <small class='text-muted'>
                                      1 box x 30 tablets
                                    </small>{" "}
                                  </div>
                                </div>
                              </th>

                              <td className='align-middle border-0'>
                                <div className='d-flex align-items-center justify-content-between px-1'>
                                  <div className='quantity p-0 m-0'>
                                    <button
                                      className='p-0'
                                      onClick={() => subQuantity(product._id)}
                                    >
                                      <FontAwesomeIcon icon={faCaretLeft} />
                                    </button>
                                    <span className='btn'>{product.qty}</span>
                                    <button
                                      className='p-0'
                                      onClick={() => addQuantity(product._id)}
                                    >
                                      <FontAwesomeIcon icon={faCaretRight} />
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className='align-middle border-0'>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() => handleEmptyCart(product._id)}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    {cart.products.length > 0 && (
                      <div className='bg-light px-4 py-3'>
                        <div className='row align-items-center text-center'>
                          <div className='col-md-6 mb-3 mb-md-0 text-md-left'>
                            <button
                              className='btn btn-soft-danger btn-sm'
                              onClick={checkInteraction}
                            >
                              Check drug interaction
                            </button>
                          </div>
                          <div className='col-md-6 text-md-right'>
                            <button
                              className='btn btn-sm btn-soft-primary'
                              onClick={() => setEventKey("third")}
                            >
                              Add detail prescription
                              <FontAwesomeIcon
                                icon={faLongArrowAltRight}
                                className='ml-2'
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <ModalInteraction
                      showModal={showModalInteraction}
                      //handleClose={() => setShowModalInteraction(false)}
                      handleClose={handleCloseModalInteraction}
                      interaction={interaction}
                    />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey='third'>
                <Row>
                  <Col md={12} className='mx-auto'>
                    <Table>
                      <thead className='bg-light'>
                        <tr>
                          <th className='border-0'>
                            <FontAwesomeIcon icon={faPrescription} size='lg' />
                          </th>
                          <th className='border-0'>
                            <div className=' pt-2'>Quantity</div>
                          </th>
                          <th className='border-0'>
                            <div className=' pt-2'>
                              Frequency (Morning - Afternoon - Evening)
                            </div>
                          </th>
                          <th className='border-0'>
                            <div className=' pt-2'>Direction</div>
                          </th>
                          <th className='border-0'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart &&
                          cart.products.map((product, idx) => (
                            <tr key={idx}>
                              <th className='pl-0 border-0' scope='row'>
                                <div className='media align-items-center'>
                                  <img
                                    src={product?.images[0]}
                                    alt='...'
                                    width='50'
                                  />
                                  <div class='d-flex flex-column ml-2'>
                                    <span class='d-block font-weight-bold'>
                                      {product.name.substring(0, 50)}
                                    </span>
                                    <small class='text-muted'>
                                      {product.ingredient}
                                    </small>{" "}
                                    <small class='text-muted'>
                                      1 box x 30 tablets
                                    </small>{" "}
                                  </div>
                                </div>
                              </th>

                              <td className='align-middle border-0'>
                                <div className='d-flex align-items-center justify-content-between px-1'>
                                  <div className='quantity p-0 m-0'>
                                    <button
                                      className='p-0'
                                      onClick={() => subQuantity(product._id)}
                                    >
                                      <FontAwesomeIcon icon={faCaretLeft} />
                                    </button>
                                    <span className='btn'>{product.qty}</span>
                                    <button
                                      className='p-0'
                                      onClick={() => addQuantity(product._id)}
                                    >
                                      <FontAwesomeIcon icon={faCaretRight} />
                                    </button>
                                  </div>
                                </div>
                              </td>

                              <td className='align-middle border-0'>
                                <div style={{ width: "150px" }}>
                                  <Select
                                    placeholder={
                                      product?.frequency
                                        ? product.frequency
                                        : ""
                                    }
                                    onChange={(e) => handleSelected(product, e)}
                                    options={frequencyOptions}
                                  />
                                </div>
                              </td>
                              <td className='align-middle border-0'>
                                <div style={{ width: "150px" }}>
                                  <Select
                                    placeholder={
                                      product?.direction
                                        ? product.direction
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleSelectedDirection(product, e)
                                    }
                                    options={directionOptions}
                                  />
                                </div>
                              </td>
                              <td className='align-middle border-0'>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() => handleEmptyCart(product._id)}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <Button
                      className='btn-pills mb-5'
                      onClick={() => handleUpdateAppointment()}
                    >
                      Save Prescription
                    </Button>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
    </div>
  );
};

export default DoctorPrescribing;
