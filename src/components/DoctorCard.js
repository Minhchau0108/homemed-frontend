import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import {
  faMap as farMap,
  faClock as farClock,
} from "@fortawesome/free-regular-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import ModalBookAppointment from "./ModalBookAppointment";
const DoctorCard = ({ doctor }) => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const handleShowModal = () => {
    if (isAuthenticated) setShowAppointmentModal(true);
    if (!isAuthenticated) history.push(`/login`);
  };
  return (
    <>
      <Card
        className='card shadow overflow-hidden mb-3'
        style={{ border: "none" }}
      >
        <Row>
          <Col lg={6}>
            <div className='doctor-card-image-wrapper overflow-hidden'>
              <div className='doctor-card-top'>
                <Link className='doctor-icon' to={`/doctors/${doctor._id}`}>
                  <FontAwesomeIcon icon={faUserMd} size='lg' />
                </Link>
                <div
                  className='book'
                  //onClick={() => setShowAppointmentModal(true)}
                  onClick={handleShowModal}
                >
                  <FontAwesomeIcon
                    icon={farClock}
                    color='white'
                    className='mr-2'
                  />
                  Make An Appointment
                </div>
              </div>
              <img
                src={doctor && doctor?.profileURL}
                alt=''
                className='img-fluid'
              />
            </div>
          </Col>
          <Col lg={6}>
            <Card.Body className='py-1 mt-3'>
              <div className='mb-0 text-dark title-h5'>{doctor.name}</div>
              <div className='d-flex justify-content-between'>
                <div className='text-dark mb-0 title-h6 mt-1 font-weight-light'>
                  {doctor.field}
                </div>
                <StarRatings
                  rating={4}
                  starRatedColor='#FFC107'
                  numberOfStars={5}
                  name='rating'
                  starDimension='15px'
                  starSpacing='1px'
                />
              </div>
              <div className='d-flex mt-3 mb-1 py-0'>
                <FontAwesomeIcon icon={farMap} className='mr-2' />
                <div className='text-gray small'>{doctor.address}</div>
              </div>
              <div className='d-flex mt-3'>
                <FontAwesomeIcon icon={farClock} className='mr-2' />
                <div className='text-gray small'>{doctor.workingTime}</div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <ModalBookAppointment
        doctor={doctor}
        showModal={showAppointmentModal}
        handleClose={() => setShowAppointmentModal(false)}
      />
    </>
  );
};

export default DoctorCard;
