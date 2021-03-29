import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "./../../redux/actions/doctor.actions";
import DoctorCard from "../../components/DoctorCard";
import SearchBar2 from "../../components/SearchBar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBaby,
  faHeartbeat,
  faAllergies,
  faHeadSideVirus,
  faFemale,
  faUserMd,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import PaginationBar from "../../components/PaginationBar";
import banner4 from "../../images/banner-4.png";
import { useHistory } from "react-router-dom";

const DoctorsPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [query, setQuery] = useState("");
  const [field, setField] = useState(null);
  const doctors = useSelector((state) => state.doctor.doctors);
  const totalPages = useSelector((state) => state.doctor.totalPages);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(doctorActions.getAllDoctors(pageNum, 6, field, query));
  }, [dispatch, pageNum, field, query]);
  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  const shouldShowPagination = doctors.length > 0 && totalPages > 1;
  return (
    <>
      <div
        className='hero bg-top mt-5'
        style={{
          background: `url(${banner4}) no-repeat`,
          backgroundSize: `100% 80%`,
          minHeight: "45vh",
        }}
      >
        <h3
          className='text-center text-capitalize font-weight-bold'
          style={{ paddingTop: "80px" }}
        >
          Our doctors
        </h3>
        <div className='text-center pt-2' style={{ fontSize: "16px" }}>
          You can easily make an appointments with doctors
          <button
            className='btn btn-primary px-2 ml-2'
            onClick={() => history.push(`/doctors/create-appointment`)}
          >
            Make an appointment
            <FontAwesomeIcon icon={faClock} className='ml-2' size='lg' />
          </button>
        </div>
      </div>
      <Container>
        <Col>
          <SearchBar2
            onSubmit={onSubmit}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Row className='mt-4 g-1 px-2 mb-5'>
          <Col md={2}>
            <button
              className={`btn card-inner p-3 d-flex flex-column align-items-center ${
                field === "Internal" && "selected-field"
              }`}
              onClick={(e) => setField(e.currentTarget.value)}
              value='Internal'
            >
              <FontAwesomeIcon icon={faUserMd} size='3x' color='#3E9CDD' />
              <div className='text-center mt-2'>
                <span>Internal</span>
              </div>
            </button>
          </Col>
          <Col md={2}>
            <button
              className={`btn card-inner p-3 d-flex flex-column align-items-center ${
                field === "Pediatrician" && "selected-field"
              }`}
              onClick={(e) => setField(e.currentTarget.value)}
              value='Pediatrician'
            >
              <FontAwesomeIcon icon={faBaby} size='3x' color='#3E9CDD' />
              <div className='text-center mg-text mt-2'>
                <span>Pediatrician</span>
              </div>
            </button>
          </Col>
          <Col md={2}>
            <button
              className={`btn card-inner p-3 d-flex flex-column align-items-center ${
                field === "Psychiatrist" && "selected-field"
              }`}
              onClick={(e) => setField(e.currentTarget.value)}
              value='Psychiatrist'
            >
              <FontAwesomeIcon
                icon={faHeadSideVirus}
                size='3x'
                color='#3E9CDD'
              />
              <div className='text-center  mt-2'>
                <span>Psychiatrist</span>
              </div>
            </button>
          </Col>
          <Col md={2}>
            <button
              className={`btn card-inner p-3 d-flex flex-column align-items-center ${
                field === "Dermatologist" && "selected-field"
              }`}
              onClick={(e) => setField(e.currentTarget.value)}
              value='Dermatologist'
            >
              <FontAwesomeIcon icon={faAllergies} size='3x' color='#3E9CDD' />
              <div className='text-center mt-2'>
                <span>Dermatologist</span>
              </div>
            </button>
          </Col>
          <Col md={2}>
            <button
              className={`btn card-inner p-3 d-flex flex-column align-items-center ${
                field === "Cardiologist" && "selected-field"
              }`}
              onClick={(e) => setField(e.currentTarget.value)}
              value='Cardiologist'
            >
              <FontAwesomeIcon icon={faHeartbeat} size='3x' color='#3E9CDD' />
              <div className='text-center mt-2'>
                <span>Cardiologist</span>
              </div>
            </button>
          </Col>
          <Col md={2}>
            <button
              className={`btn card-inner p-3 d-flex flex-column align-items-center ${
                field === "Gynecologist" && "selected-field"
              }`}
              onClick={(e) => setField(e.currentTarget.value)}
              value='Gynecologist'
            >
              <FontAwesomeIcon icon={faFemale} size='3x' color='#3E9CDD' />
              <div className='text-center mt-2'>
                <span>Gynecologist</span>
              </div>
            </button>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginBottom: "100px" }}>
        <Row className='pt-3'>
          {doctors.map((doctor) => (
            <Col md={6} sm={6} key={doctor._id}>
              <DoctorCard doctor={doctor} />
            </Col>
          ))}
        </Row>
        {shouldShowPagination && (
          <div className='d-flex justify-content-end'>
            <PaginationBar
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default DoctorsPage;
