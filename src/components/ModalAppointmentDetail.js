import React from "react";
import { Modal, Col, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const generateStatus = (status) => {
  if (status === "new")
    return (
      <span className='badge bg-soft-primary text-capitalize'>{status}</span>
    );
  if (status === "cancelled")
    return (
      <span className='badge bg-soft-danger text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-success text-capitalize'>{status}</span>
  );
};

const ModalAppointmentDetail = ({ showModal, handleClose, appointment }) => {
  console.log("appointment modal", appointment);
  return (
    <div>
      <Modal show={showModal} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div class='title-h5'>Appointment Informations</div>{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={8} className='border-right pl-4'>
              <Table borderless>
                <tbody>
                  <tr className='border-bottom'>
                    <td>
                      <span class='title-h6 d-block'>Status</span>{" "}
                    </td>
                    <td>{generateStatus(appointment.status)}</td>
                  </tr>
                  <tr className='border-bottom'>
                    <td>
                      <div class='title-h6 d-block'>Appointment Date</div>{" "}
                    </td>
                    <td>At {moment(appointment?.time).format("ll")}</td>
                  </tr>
                  <tr className='border-bottom'>
                    <td>
                      <div class='title-h6 d-block'>Appointment ID</div>{" "}
                    </td>
                    <td>{Date.parse(appointment?.createdAt)}</td>
                  </tr>
                  <tr className='border-bottom'>
                    <td>
                      <div className='title-h6 d-block'>
                        Examination Location
                      </div>{" "}
                    </td>
                    <td>
                      {" "}
                      <span className='badge bg-soft-success text-capitalize'>
                        At doctor's private clinic
                      </span>
                    </td>
                  </tr>
                  <tr className='border-bottom'>
                    <td>
                      <span class='title-h6 d-block'>Patient Age</span>{" "}
                    </td>
                    <td>{appointment.patientAge}</td>
                  </tr>
                  <tr className='border-bottom'>
                    <td>
                      <span class='title-h6 d-block'>Patient Name</span>{" "}
                    </td>
                    <td>{appointment.patientName}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <div className='p-2 text-center'>
                <img
                  src={appointment?.doctor?.profileURL}
                  width='100'
                  height='100'
                  className='rounded-circle border'
                  alt=''
                />
                <div className='mt-3 title-h5'>
                  Dr. {appointment.doctor.name}
                </div>
              </div>

              <Table borderless>
                <tbody>
                  <tr>
                    <td className='text-center'>
                      <div className='d-flex flex-column'>
                        <div class='title-h6 d-block'>
                          {appointment.doctor.field}
                        </div>
                        <div className='d-flex mt-2'>
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className='mr-2'
                          />
                          <div className='text-muted'>
                            {appointment.doctor.address}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalAppointmentDetail;
