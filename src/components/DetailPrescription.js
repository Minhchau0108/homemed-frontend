import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";
import { Row, Col, Nav, Tab } from "react-bootstrap";

const DetailPrescription = ({ prescription }) => {
  return (
    <>
      <Row className='justify-content-center'>
        <Col lg={12}>
          <div className='border bg-white' style={{ borderRadius: "0.5rem" }}>
            <Tab.Container defaultActiveKey='info'>
              <Nav fill variant='pills' className='bg-light'>
                <Nav.Item className='p-0'>
                  <Nav.Link eventKey='info'>Patient Information</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='image'>Prescription Images</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className='px-5 py-3'>
                <Tab.Pane eventKey='info'>
                  {prescription && (
                    <>
                      <ul className='list-unstyled mb-0'>
                        <li className='d-flex align-items-center justify-content-between'>
                          <div className='font-weight-bold'>Patient 's Age</div>
                          <span className='text-muted'>
                            {prescription?.patientAge}
                          </span>
                        </li>
                        <li className='border-bottom my-2'></li>
                        <li className='d-flex align-items-center justify-content-between'>
                          <div className='font-weight-bold'>
                            Patient 's Height
                          </div>
                          <span className='text-muted'>
                            {prescription.patientHeight}
                          </span>
                        </li>
                        <li className='border-bottom my-2'></li>
                        <li className='d-flex align-items-center justify-content-between'>
                          <div className='font-weight-bold'>
                            Patient 's Weight
                          </div>
                          <span className='text-muted'>
                            {prescription.patientWeight}
                          </span>
                        </li>
                        <li className='border-bottom my-2'></li>

                        <li className='d-flex align-items-center justify-content-between'>
                          <div className='font-weight-bold'>Patient 's BMI</div>
                          <span className='text-muted'>
                            {prescription.patientWeight}
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey='image'>
                  {prescription && prescription.images && (
                    <img src={prescription?.images[0]}></img>
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetailPrescription;
