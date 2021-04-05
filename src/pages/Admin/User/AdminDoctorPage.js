import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { doctorActions } from "../../../redux/actions/doctor.actions";
import { Link } from "react-router-dom";
//import StarRatings from "react-star-ratings";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap as farMap,
  faClock as farClock,
} from "@fortawesome/free-regular-svg-icons";
import { ClipLoader } from "react-spinners";

const DoctorCard = ({ doctor }) => {
  return (
    <>
      <Card
        className='card shadow mb-3 overflow-hidden'
        style={{ border: "none" }}
      >
        <Card.Img variant='top' src={doctor.profileURL} />

        <Card.Body className='py-1 mt-3'>
          <div className='mb-0 text-dark title-h5'>{doctor.name}</div>
          <div className='d-flex justify-content-between'>
            <div className='text-dark mb-0 title-h6 mt-1 font-weight-light'>
              {doctor.field}
            </div>
            {/* <StarRatings
              rating={4}
              starRatedColor='#FFC107'
              numberOfStars={5}
              name='rating'
              starDimension='15px'
              starSpacing='1px'
            /> */}
          </div>
          <div className='d-flex mt-3 mb-1 py-0'>
            <FontAwesomeIcon icon={farMap} className='mr-2' />
            <div className='text-gray small'>{doctor.address}</div>
          </div>
          <div className='d-flex mt-3 '>
            <FontAwesomeIcon icon={farClock} className='mr-2' />
            <p className='text-gray small'>{doctor.workingTime}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

const AdminDoctorPage = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doctorActions.getAllDoctors());
  }, [dispatch]);
  console.log("doctor", doctors);

  return (
    <Row>
      <Col md={12} className='d-flex flex-column mx-auto'>
        <div className='ml-auto my-3'>
          <Link to='create-doctor'>
            <button className='btn btn-primary my-2 mx-2 btn-pills '>
              <FontAwesomeIcon icon={faPlus} className='mr-1' />
              <span> Add new doctor</span>
            </button>
          </Link>
        </div>
        <Row>
          {loading && (
            <div
              className='d-flex justify-content-center'
              style={{ width: "100%" }}
            >
              <div>
                <ClipLoader color='#f86c6b' size={150} loading={loading} />
              </div>
            </div>
          )}
          {!loading &&
            doctors.map((doctor) => (
              <Col lg={3} md={3}>
                <DoctorCard doctor={doctor} key={doctor._id} />
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AdminDoctorPage;
