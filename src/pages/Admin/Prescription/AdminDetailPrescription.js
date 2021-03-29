import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { prescriptionActions } from "../../../redux/actions/prescription.actions";
import { ClipLoader } from "react-spinners";
import { Row, Col, Container, Card, Table } from "react-bootstrap";
import DetailPrescription from "../../../components/DetailPrescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPlus, faCapsules } from "@fortawesome/free-solid-svg-icons";
import AdminCreateOrder from "./AdminCreateOrder";
import moment from "moment";

const generateStatus = (status) => {
  if (status === "new")
    return (
      <span className='badge bg-soft-primary text-capitalize'>{status}</span>
    );
  if (status === "done")
    return (
      <span className='badge bg-soft-success text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-warning text-capitalize'>{status}</span>
  );
};

const AdminDetailPrescription = () => {
  const [showCreatingOrder, setShowCreatingOrder] = useState(false);
  const prescription = useSelector(
    (state) => state.prescription.selectedPrescription
  );
  const loading = useSelector((state) => state.prescription.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(prescriptionActions.getSinglePrescription(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <ClipLoader color='#f86c6b' size={150} loading={loading} />
      ) : (
        <>
          <Container fluid>
            <Row className='d-flex justify-content-center bg-white rounded shadow mt-2'>
              <Col md={8}>
                <div>
                  <div className='text-left p-2 px-5 mt-3'>
                    <FontAwesomeIcon
                      icon={faCapsules}
                      size='4x'
                      color='#0072B5'
                    />
                  </div>
                  <div className='p-5'>
                    <div className='title-h5'>PRESCRIPTION DETAIL</div>
                    <div className='d-flex justify-content-between'>
                      <div className='title-h6 mt-3'>
                        Status Prescription{" "}
                        {prescription && generateStatus(prescription?.status)}
                        {prescription &&
                          prescription.status === "done" &&
                          prescription?.orderId && (
                            <div
                              style={{ fontSize: "14px", cursor: "pointer" }}
                              className='text-muted mt-3 font-italic'
                              onClick={() =>
                                history.push(
                                  `/admin/orders/${prescription?.orderId}`
                                )
                              }
                            >
                              Click here to view detail order for this
                              prescription
                            </div>
                          )}
                      </div>
                      <div className='d-flex'>
                        {prescription?.status === "new" && (
                          <>
                            <button
                              className='btn btn-soft-primary mr-2 btn-pills'
                              onClick={() => {
                                setShowCreatingOrder(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} className='mr-1' />
                              <span> Create Order</span>
                            </button>
                            <button
                              className='btn btn-soft-danger btn-pills'
                              onClick={() => {
                                dispatch(
                                  prescriptionActions.updateStatusPrescription(
                                    prescription._id,
                                    "cancelled"
                                  )
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faBan} className='mr-1' />
                              <span> Cancel</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className='border-top mt-3 mb-2 border-bottom table-responsive'>
                      <Table borderless>
                        <tbody>
                          <tr className='border-bottom'>
                            <td>
                              <div className='text-muted'>Customer name</div>
                              <div className='title-h6'>
                                {prescription?.owner?.name}
                              </div>
                            </td>
                            <td>
                              <div className='text-muted'>Date Submitted</div>
                              <div>
                                {moment(prescription?.createdAt).format("LL")}
                              </div>
                            </td>
                            <td>
                              <div className='text-muted'>Phone Contact</div>
                              <div>(+84){prescription?.phone}</div>{" "}
                            </td>
                            <td>
                              <div className='text-muted'>Contact Address</div>
                              <div>{prescription?.address}</div>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className='text-muted'>Patient Age</div>
                              <div>{prescription?.patientAge}</div>
                            </td>
                            <td>
                              <div className='text-muted'>Patient Height</div>
                              <div>{prescription?.patientHeight}</div>{" "}
                            </td>
                            <td>
                              <div className='text-muted'>Patient Weight</div>
                              <div>{prescription?.patientWeight}</div>{" "}
                            </td>
                            <td>
                              <div className='text-muted'>Patient BMI</div>
                              <div>{prescription?.patientWeight}</div>{" "}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className='title-h6 mt-1'> Image Prescription</div>
                {prescription?.images && (
                  <img src={prescription?.images[0]} width='300px'></img>
                )}
              </Col>
            </Row>
          </Container>

          {showCreatingOrder &&
            prescription &&
            prescription.status === "new" && (
              <AdminCreateOrder prescription={prescription} />
            )}
        </>
      )}
    </>
  );
};

export default AdminDetailPrescription;
