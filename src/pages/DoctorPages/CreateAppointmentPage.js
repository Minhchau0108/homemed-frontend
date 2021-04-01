import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { appointmentActions } from "./../../redux/actions/appointment.actions";
import { doctorActions } from "../../redux/actions/doctor.actions";
import Select from "react-select";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import banner4 from "../../images/banner-4.png";
const CreateAppointmentPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [time, setTime] = useState(null);
  const [field, setField] = useState("Internal");
  const doctors = useSelector((state) => state.doctor.doctors);
  const [options, setOptions] = useState([{ value: "", label: "" }]);
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    doctor: "",
    phone: "",
    time: "",
    note: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doctorActions.getAllDoctors());
  }, [dispatch]);

  useEffect(() => {
    let newOptions = doctors
      .filter((d) => d.field === field)
      .map((d) => ({
        value: d._id,
        label: `${d.name} - ${d.field} - ${d.address}`,
      }));
    setOptions(newOptions);
  }, [doctors, field]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    console.log("dateTime", time);
    formData.doctor = selectedDoctor.value;
    formData.time = time;
    console.log("form", formData);
    dispatch(appointmentActions.createAppointment(formData));
  };
  console.log("dateTime", time);
  return (
    <>
      <div
        className='hero bg-top mt-5'
        style={{
          background: `url(${banner4}) no-repeat`,
          backgroundSize: `100% 80%`,
          minHeight: "40vh",
        }}
      >
        <h3
          className='text-center text-capitalize font-weight-bold'
          style={{ paddingTop: "100px", paddingBottom: "10px" }}
        >
          Make an appointment
        </h3>
        <div className='text-center'>
          Great doctor if you need your family member to get effective immediate
          assistance, emergency treatment or a simple consultation.
        </div>
      </div>
      <Container style={{ marginBottom: "100px" }}>
        <Row className='justify-content-center'>
          <Col lg={8}>
            <div className='border shadow' style={{ borderRadius: "0.5rem" }}>
              <Form
                className='px-5 pt-4 py-3'
                onSubmit={handleSubmitAppointment}
              >
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

                <Form.Group>
                  <Form.Label>
                    Field <span className='text-danger'>*</span>
                  </Form.Label>
                  <Form.Control
                    as='select'
                    custom
                    name='field'
                    onChange={(e) => setField(e.target.value)}
                  >
                    <option value='Internal'>Internal </option>
                    <option value='Pediatrician'>Pediatrician</option>
                    <option value='Psychiatrist'>Psychiatrist</option>
                    <option value='Dermatologist'>Dermatologist</option>
                    <option value='Cardiologist'>Cardiologist</option>
                    <option value='Gynecologist'>Gynecologist</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='doctor'>
                  <Form.Label>
                    Doctor <span className='text-danger'>*</span>
                  </Form.Label>
                  <Select
                    defaultValue={selectedDoctor}
                    onChange={setSelectedDoctor}
                    options={options}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId='timeAppointment'>
                    <Form.Label>
                      DateTime <span className='text-danger'>*</span>
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
                  <Form.Label>Reason </Form.Label>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateAppointmentPage;
