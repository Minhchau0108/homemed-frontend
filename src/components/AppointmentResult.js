import React, { useRef } from "react";
import { Row, Col, Table, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarked,
  faPrint,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

import { useReactToPrint } from "react-to-print";

const AppointmentResult = ({ appointment }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Container className='mb-5' ref={componentRef}>
      <Row className='d-flex justify-content-center mt-2'>
        <Col lg={10}>
          <Card className='rounded shadow border-0'>
            <div className='p-2 px-5 mt-3 d-flex flex-row '>
              <FontAwesomeIcon icon={faStethoscope} size='4x' color='#0072B5' />
              <div className='d-flex flex-column ml-4'>
                <div className='title-h5'>DR. {appointment?.doctor?.name}</div>{" "}
                <div className='title-h6'>{appointment?.doctor?.field}</div>{" "}
                <div className='text-muted mt-2'>
                  <FontAwesomeIcon icon={faMapMarked} className='mr-2' />
                  {appointment?.doctor?.address}
                </div>
              </div>
            </div>
            <hr />
            <div className='px-5 pt-3'>
              <div className='title-h5 text-center'>PRESCRIPTION</div>
              <div className='title-h6 mt-2'>
                Patient Name: {appointment?.patientName}
              </div>
              <div className='title-h6 mt-2'>
                Patient Age: {appointment?.patientAge}
              </div>
              <div className='title-h6 mt-2'>
                Diagnosis:{" "}
                {appointment &&
                  appointment?.diagnosis &&
                  appointment.diagnosis.map((d, idx) => (
                    <span key={idx} className='badge bg-soft-primary ml-1'>
                      {d}
                    </span>
                  ))}
              </div>
              <div className='border-top mt-3 mb-3 border-bottom table-responsive'>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Height</div>
                          <div className='title-h6'>
                            {appointment?.patientInfo?.patientHeight}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Weight</div>
                          <div> {appointment?.patientInfo?.patientWeight}</div>
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Blood Pressure</div>
                          <div> {appointment?.patientInfo?.pressure}</div>
                        </div>
                      </td>
                      <td>
                        <div className='py-2'>
                          <div className='text-muted'>Temperature</div>
                          <div>
                            {appointment?.patientInfo?.temperature}
                          </div>{" "}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className='border-bottom table-responsive'>
                <Table borderless>
                  <thead className='border-bottom'>
                    <tr>
                      <th className='center'>#</th>
                      <th>Rx</th>
                      <th className='right'>
                        Frequency{" "}
                        <span className='small'>
                          {" "}
                          (Morning - Afternoon - Evening)
                        </span>
                      </th>
                      <th className='text-right'>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment &&
                      appointment.prescription &&
                      appointment.prescription.map((product, idx) => (
                        <tr key={product._id}>
                          <td width='5%'>{idx + 1}</td>
                          <td width='40%'>
                            <div className='font-weight-bold'>
                              {product.name}
                            </div>
                            <div>
                              <div>{product.ingredient}</div>
                              <div>1box x 30 tablets</div>
                            </div>
                          </td>
                          <td
                            width='50%'
                            className='text-left font-weight-bold'
                          >
                            {product.frequency} | {product.direction}
                          </td>
                          <td
                            width='5%'
                            className='text-right font-weight-bold'
                          >
                            {product.qty}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <div className='d-flex flex-column justify-content-end'>
                <div className='title-h6 text-right'>Signature By</div>
                <div>
                  <button
                    className='btn btn-soft-primary'
                    onClick={handlePrint}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faPrint}
                      size='lg'
                      className='mr-3'
                    />
                    Print
                  </button>
                </div>
                <div className='title-h5 mt-5 text-right'>
                  Dr. {appointment?.doctor?.name}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentResult;
