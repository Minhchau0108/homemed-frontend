import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, avatarUrl } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }
    // TODO: handle Register
    dispatch(authActions.register(name, email, password, avatarUrl));
  };

  return (
    <Container fluid className='bg-light'>
      <Container
        style={{
          minHeight: "60vh",
        }}
        className='mt-5'
      >
        <Row className='py-5'>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className='border-0 rounded shadow p-4'>
              <div className='text-center mb-3'>
                <h1 className='text-primary heading'>Sign Up</h1>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <small className='form-text text-danger'>
                      {errors.name}
                    </small>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small className='form-text text-danger'>
                      {errors.email}
                    </small>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <small className='form-text text-danger'>
                      {errors.password}
                    </small>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </Form.Group>

                {loading ? (
                  <Button
                    className='btn-block'
                    variant='primary'
                    type='button'
                    disabled
                  >
                    <span
                      className='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                    Loading...
                  </Button>
                ) : (
                  <Button className='btn-block' type='submit' variant='primary'>
                    Register
                  </Button>
                )}

                <p>
                  Already have an account? <Link to='/login'>Sign In</Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default RegisterPage;
