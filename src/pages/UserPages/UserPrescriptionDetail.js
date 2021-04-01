import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { prescriptionActions } from "../../redux/actions/prescription.actions";
import { Row, Col, Container, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useHistory } from "react-router-dom";

const UserPrescriptionDetail = () => {
  const prescription = useSelector(
    (state) => state.prescription.selectedPrescription
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(prescriptionActions.getSinglePrescription(id));
  }, [dispatch, id]);

  const generateStatus = (status) => {
    if (status === "new")
      return <span className='badge bg-soft-primary'>{status}</span>;
    if (status === "processing")
      return <span className='badge bg-soft-danger'>{status}</span>;
    if (status === "cancelled")
      return <span className='badge bg-soft-warning'>{status}</span>;
    return <span className='badge bg-soft-success'>{status}</span>;
  };
  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={8}>
          <Card>
            <div className='text-left p-2 px-5 mt-3'>
              <FontAwesomeIcon icon={faCapsules} size='4x' color='#0072B5' />
            </div>
            <div className='p-5'>
              <div className='title-h5'>PRESCRIPTION DETAIL</div>
              <div className='mt-4 d-flex justify-content-between'>
                <div className='title-h5'>
                  Hello, {prescription?.owner?.name}
                </div>
                <div className='title-h6'>
                  Status Prescription{" "}
                  {prescription && generateStatus(prescription?.status)}
                </div>
              </div>
              {prescription && prescription.status === "done" && (
                <div
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  className='text-muted mt-3 font-italic'
                  onClick={() =>
                    history.push(`/user/orders/${prescription?.orderId}`)
                  }
                >
                  Click here to view your order created from this prescription
                  by our pharmacist
                </div>
              )}

              <div className='border-top mt-3 mb-2 border-bottom table-responsive'>
                <Table borderless>
                  <tbody>
                    <tr className='border-bottom '>
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
                    </tr>
                  </tbody>
                </Table>
              </div>
              {prescription?.images && (
                <div>
                  <div className='title-h6 mt-2'> Images of Prescription</div>
                  <img src={prescription?.images[0]} width='300px' alt=''></img>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPrescriptionDetail;
