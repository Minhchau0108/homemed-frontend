import React from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const diagnosisOption = [
  { value: "hypertension", label: "hypertension", color: "#00B8D9" },
  { value: "diabetes", label: "diabetes", color: "#0052CC" },
  { value: "allergy", label: "allergy", color: "#5243AA" },
  { value: "gastrointestinal", label: "gastrointestinal", color: "#00B8D9" },
  { value: "hyperlipidema", label: "hyperlipidema", color: "#0052CC" },
  {
    value: "nutritional disorders",
    label: "nutritional disorders",
    color: "#5243AA",
  },
  { value: "infection", label: "infection", color: "#00B8D9" },
  { value: "pulmonary", label: "pulmonary", color: "#0052CC" },
  { value: "flu", label: "flu", color: "#5243AA" },
];

const DiagnosisForm = ({
  handleChangeForm,
  handleChangeDiagnosis,
  handleKeySecond,
}) => {
  return (
    <Row>
      <Col md={6} className='mx-auto my-5'>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId='patientHeight'>
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter height'
                onChange={handleChangeForm}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='patientWeight'>
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter weight'
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='temperature'>
              <Form.Label>Temperature</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter temperature'
                onChange={handleChangeForm}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='pressure'>
              <Form.Label>Blood Pressure (mmHg)</Form.Label>
              <Form.Control
                type='text'
                placeholder='110/80'
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form.Row>

          <div className='mb-3'>Diagnosis</div>
          <Select
            isMulti
            name='colors'
            options={diagnosisOption}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleChangeDiagnosis}
          />
        </Form>
        <div className='text-center mt-2'>
          <Button variant='primary' className='px-4' onClick={handleKeySecond}>
            E-prescribing
            <FontAwesomeIcon icon={faLongArrowAltRight} className='ml-2' />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default DiagnosisForm;
