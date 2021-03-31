import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../../redux/actions/order.actions";
import { Row, Col, Table, Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import moment from "moment";
import cod from "../../../images/cod.png";

const Status = ({ status, handleStatus }) => {
  const newOptions = [
    { value: "new", label: "New" },
    { value: "confirmed", label: "Customer Confirmed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "delivered", label: "Delivered" },
  ];
  const confirmOptions = [
    { value: "confirmed", label: "Customer Confirmed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "delivered", label: "Delivered" },
  ];
  if (status === "new")
    return (
      <>
        <div>
          Status{" "}
          <span className='badge bg-soft-primary text-capitalize'>
            {status}
          </span>
        </div>
        <div style={{ width: "300px" }}>
          <h6>Change Status</h6>
          <Select options={newOptions} onChange={handleStatus} />
        </div>
      </>
    );
  if (status === "confirmed")
    return (
      <>
        <div>
          Status{" "}
          <span className='badge bg-soft-danger text-capitalize'>
            Customer Confirmed
          </span>
        </div>
        <div style={{ width: "300px" }}>
          <h6>Change Status</h6>
          <Select options={confirmOptions} onChange={handleStatus} />
        </div>
      </>
    );

  if (status === "cancelled")
    return (
      <span className='badge bg-soft-warning text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-success text-capitalize'>{status}</span>
  );
};
const AdminOrderDetailPage = () => {
  const order = useSelector((state) => state.order.selectedOrder);
  const [updateStatus, setUpdateStatus] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getSingleOrder(id));
  }, [dispatch, id]);
  const handleSelect = (e) => {
    setUpdateStatus(e.value);
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center mt-2'>
        <Col md={12}>
          <Card className='rounded shadow'>
            <div className='text-left p-2 px-5 mt-3'>
              <FontAwesomeIcon icon={faCapsules} size='4x' color='#0072B5' />
            </div>
            <div className='px-5 pt-3'>
              <div className='title-h5'>ORDER DETAIL</div>
              <div className='mt-4 d-flex justify-content-between'>
                {/* Status Order {order && generateStatus(order?.status)} */}
                <Status status={order?.status} handleStatus={handleSelect} />
              </div>

              <div className='border-top mt-3 mb-3 border-bottom table-responsive'>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Customer</div>
                          <div className='title-h6'>
                            {order?.customer?.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Order Date</div>
                          <div>{moment(order?.createdAt).format("LL")}</div>
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Payment</div>
                          <img src={cod} width='40' alt='' />
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Shiping Address</div>
                          <div>{order?.address}</div>{" "}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className='border-bottom table-responsive'>
                <Table borderless>
                  <tbody>
                    {order &&
                      order.products &&
                      order?.products.map((product) => (
                        <tr key={product._id}>
                          <td width='20%'>
                            <img src={product?.images[0]} width='90' />{" "}
                          </td>
                          <td width='60%'>
                            <div className='font-weight-bold'>
                              {product?.name}
                            </div>
                            <div>
                              <div>
                                <span>Quantity:</span> {product?.qty}
                              </div>
                              <div>
                                <span>Unit Price: </span>
                                {new Intl.NumberFormat().format(product?.price)}
                              </div>
                            </div>
                          </td>
                          <td
                            width='20%'
                            className='text-right font-weight-bold'
                          >
                            {new Intl.NumberFormat().format(
                              product?.price * product?.qty
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <Row className='justify-content-end'>
                <Col md={5}>
                  <Table borderless>
                    <tbody>
                      <tr className='border-bottom'>
                        <td className='text-left font-weight-bold'>Total</td>
                        <td className='text-right font-weight-bold'>
                          {new Intl.NumberFormat().format(order?.totalPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
            <div className='mb-5 pl-5'>
              {order &&
                order.status &&
                (order.status === "new" || order.status === "confirmed") && (
                  <Button
                    className='btn-pills'
                    onClick={() =>
                      dispatch(
                        orderActions.updateStatusOrder(order?._id, updateStatus)
                      )
                    }
                  >
                    Save Changes
                  </Button>
                )}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrderDetailPage;
