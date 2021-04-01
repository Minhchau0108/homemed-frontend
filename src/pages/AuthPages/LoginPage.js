import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const history = useHistory();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: "Password must be longer than 3" });
      return;
    }
    dispatch(authActions.loginRequest(email, password));
  };
  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser.role === "user")
      history.push("/");
    if (isAuthenticated && currentUser && currentUser.role === "admin")
      history.push("/admin/dashboard");
    if (isAuthenticated && currentUser && currentUser.role === "doctor")
      history.push("/admin-doctor/appointments");
  }, [isAuthenticated, currentUser, history]);

  //if (isAuthenticated) return <Redirect to='/' />;
  const loginWithFacebook = (response) => {
    dispatch(authActions.loginFacebookRequest(response.accessToken));
  };

  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogleRequest(response.accessToken));
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
              <Form onSubmit={handleSubmit}>
                <div className='text-center my-3'>
                  <h1 className='heading text-primary'>Sign In</h1>
                </div>

                <div className='d-flex flex-column text-center'>
                  <FacebookLogin
                    appId={FB_APP_ID}
                    fields='name,email,picture'
                    callback={loginWithFacebook}
                    icon='fa-facebook'
                    onFailure={(err) => {
                      console.log("FB LOGIN ERROR:", err);
                    }}
                    containerStyle={{
                      textAlign: "center",
                      backgroundColor: "#3b5998",
                      borderColor: "#3b5998",
                      flex: 1,
                      display: "flex",
                      color: "#fff",
                      cursor: "pointer",
                      marginBottom: "3px",
                    }}
                    buttonStyle={{
                      flex: 1,
                      textTransform: "none",
                      padding: "12px",
                      background: "none",
                      border: "none",
                    }}
                  />

                  <GoogleLogin
                    className='google-btn d-flex justify-content-center mt-3'
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText='Login with Google'
                    onSuccess={loginWithGoogle}
                    onFailure={(err) => {
                      console.log("GOOGLE LOGIN ERROR:", err);
                    }}
                    cookiePolicy='single_host_origin'
                  />
                </div>
                <hr data-content='OR' className='hr-text my-4' />
                <Form.Group>
                  <Form.Control
                    type='email'
                    required
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
                    minLength='3'
                  />
                  {errors.password && (
                    <small className='form-text text-danger'>
                      {errors.password}
                    </small>
                  )}
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
                    Login
                  </Button>
                )}

                <div className='mt-2'>
                  Don't have an account? <Link to='/register'>Sign Up</Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LoginPage;
