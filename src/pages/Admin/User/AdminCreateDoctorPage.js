import React, { useState } from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { doctorActions } from "../../../redux/actions/doctor.actions";

const AdminCreateDoctorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profileURL:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?size=338&ext=jpg&ga=GA1.2.2070128673.1608777434",
    field: "",
    address: "",
    description: "",
    workingTime: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", formData);
    dispatch(doctorActions.registerDoctor(formData));
  };

  return (
    <>
      <Col lg={10} className='mx-auto my-3'>
        <Row className='justify-content-between p-3'>
          <div className='title-h5'>Upload doctor's picture</div>
          <div></div>
          <Button variant='primary'>Upload </Button>
        </Row>
      </Col>

      <Col lg={10} className='mx-auto my-3 bg-white p-3 border-0 rounded'>
        <Form className='border-0 p-3 rounded' onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='name'>
              <Form.Label>Doctor's Full Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter full name'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter email'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name='phone'
                type='number'
                placeholder='Phone'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='field'>
              <Form.Label>Field</Form.Label>
              <Form.Control
                as='select'
                custom
                onChange={handleChange}
                name='field'
              >
                <option value='Internal'>Internal Physician</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Psychiatrist'>Psychiatrist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Cardiologist'>Cardiologist</option>
                <option value='Gynecologist'>Gynecologist</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              placeholder='Enter address clinic'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Working Time</Form.Label>
            <Form.Control
              type='text'
              name='workingTime'
              placeholder='Enter working Time'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your Bio Here</Form.Label>
            <Form.Control
              type='text'
              placeholder='Apartment, studio, or floor'
              name='description'
              as='textarea'
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group id='formGridCheckbox'>
            <Form.Check type='checkbox' label='Check Information' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default AdminCreateDoctorPage;
