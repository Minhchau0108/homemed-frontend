import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { prescriptionActions } from "../../redux/actions/prescription.actions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner4 from "../../images/banner-4.png";

const Step = (props) => {
  return (
    <li
      className='timeline-item bg-white rounded ml-3 p-4 shadow'
      style={{ border: "1px solid rgb(47, 113, 201)" }}
    >
      <div className='timeline-arrow'></div>
      <div className='d-flex align-items-start'>
        <div>
          <FontAwesomeIcon
            icon={props.icon}
            className='mr-4 mt-1'
            size='3x'
            color='#616161'
          />
        </div>
        <div>
          <h4 className='mb-0' style={{ fontFamily: "Dancing Script" }}>
            Step {props.step}
          </h4>
          <div className='mt-2 font-weight-light'>{props.title}</div>
        </div>
      </div>
    </li>
  );
};

const STEP = [
  {
    step: 1,
    title: "Take photo your prescription and send a picture to us",
    icon: "camera-retro",
  },
  {
    step: 2,
    title: "Our Pharmacist will call you to confirm the prescription",
    icon: "phone-volume",
  },
  {
    step: 3,
    title: " Your medication will be delivered to your home in 2 hours",
    icon: "truck",
  },
];

const CreatePrescriptionPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showForm, setShowForm] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [prescription, setPrescription] = useState({
    phone: "",
    address: "",
    patientAge: "",
    patientHeight: "",
    patientWeight: "",
    images: [],
  });
  const onChange = (e) => {
    setPrescription({ ...prescription, [e.target.id]: e.target.value });
  };
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dqvyn7tom",
      uploadPreset: "homemed_upload",
    },
    (err, result) => {
      console.log("result");
      if (result.event === "success") {
        setImageURL(result.info.url);
      }
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    console.log("prescription", prescription);
    prescription.images.push(imageURL);
    dispatch(prescriptionActions.createPrescription(prescription));
    history.push(`/pharmacy/create-prescription/thankyou`);
  };
  const handleStart = () => {
    console.log("handlestart");
    if (isAuthenticated) setShowForm(!showForm);
    if (!isAuthenticated) history.push(`/login`);
  };

  return (
    <>
      <div
        className='hero bg-top mt-5'
        style={{
          background: `url(${banner4}) no-repeat`,
          backgroundSize: `100% 80%`,
          minHeight: "95vh",
        }}
      >
        <Container className='pt-4 pt-5'>
          <h4 className='text-center mt-3 text-capitalize font-weight-bold'>
            Create your online prescription
          </h4>
          <Row>
            <Col lg={7} className='mx-auto'>
              <ul className='timeline'>
                {STEP.map((s) => (
                  <Step {...s} />
                ))}
              </ul>
              <div className='text-center'>
                <Button
                  variant='primary'
                  //onClick={() => setShowForm(!showForm)}
                  onClick={handleStart}
                >
                  Start
                </Button>
              </div>

              {showForm && (
                <Form
                  className='border p-4 mt-3 rounded shadow'
                  style={{ marginBottom: "100px" }}
                  onSubmit={handleSubmitPrescription}
                >
                  <Form.Group controlId='phone'>
                    <Form.Label>
                      Phone <span className='text-danger'>*</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='012345678'
                      type='number'
                      required
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group controlId='address'>
                    <Form.Label>
                      Address <span className='text-danger'>*</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='Apartment, studio, or floor'
                      type='text'
                      required
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='patientAge'>
                    <Form.Label>
                      Patient's Age <span className='text-danger'>*</span>
                    </Form.Label>
                    <Form.Control
                      placeholder='10'
                      type='text'
                      required
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId='patientHeight'>
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='150cm '
                        onChange={onChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId='patientWeight'>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='50kg'
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <img src={imageURL} width='200px' alt=''></img>

                  <div>
                    <Button variant='primary' onClick={() => widget.open()}>
                      Upload Prescription
                    </Button>
                  </div>

                  <div className='mt-3 text-center'>
                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreatePrescriptionPage;
