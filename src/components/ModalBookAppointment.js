import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { appointmentActions } from "../redux/actions/appointment.actions";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap as farMap,
  faClock as farClock,
} from "@fortawesome/free-regular-svg-icons";

const ModalBookAppointment = ({ showModal, handleClose, doctor }) => {
  const [time, setTime] = useState(null);

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    doctor: "",
    phone: "",
    time: "",
    address: "",
    note: "",
    locationType: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    formData.doctor = doctor?._id;
    formData.time = time;
    dispatch(appointmentActions.createAppointment(formData));
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton className='bg-light'>
          <Modal.Title>
            <div className='title-h5'>Make an appointment</div>{" "}
          </Modal.Title>
        </Modal.Header>

        <div className='text-center d-flex justify-content-center ml-4'>
          <div className='media align-items-center mt-2'>
            <img
              className='rounded-circle'
              src={doctor?.profileURL}
              width='80'
              height='80'
              alt=''
            />
            <div className='media-body text-left ml-3 mt-3'>
              <h6 className='mb-0 title-h6 text-decoration-none '>
                {doctor.name} - {doctor.field}
              </h6>
              <div className='d-flex mt-2 mb-1 py-0'>
                <FontAwesomeIcon icon={farMap} className='mr-2' />
                <div className='text-gray small'>{doctor.address}</div>
              </div>
              <div className='d-flex mt-2 '>
                <FontAwesomeIcon icon={farClock} className='mr-2' />
                <p className='text-gray small'>{doctor.workingTime}</p>
              </div>
            </div>
          </div>
        </div>

        <Modal.Body>
          <div className='shadow rounded mx-5'>
            <Form className='px-4 pt-5 py-3' onSubmit={handleSubmitAppointment}>
              <Form.Row>
                <Form.Group as={Col} controlId='patientName'>
                  <Form.Label>
                    Patient Name <span className='text-danger'>*</span>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Patient Name: '
                    name='patientName'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='patientAge'>
                  <Form.Label>
                    Age <span className='text-danger'>*</span>
                  </Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Age'
                    name='patientAge'
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId='timeAppointment'>
                  <Form.Label>
                    Examination Date <span className='text-danger'>*</span>
                  </Form.Label>
                  <Datetime
                    initialValue={Date.now()}
                    onChange={setTime}
                    timeFormat={false}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='phone'>
                  <Form.Label>
                    Your phone <span className='text-danger'>*</span>
                  </Form.Label>
                  <Form.Control
                    placeholder='01235432'
                    type='number'
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId='note'>
                <Form.Label>Reason for examination</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={2}
                  placeholder='Fever and acute cough'
                  name='comment'
                  onChange={handleChange}
                />
              </Form.Group>

              <div className='row justify-content-center '>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalBookAppointment;
