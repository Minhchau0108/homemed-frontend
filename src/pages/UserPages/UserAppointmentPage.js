import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ModalAppointmentDetail from "../../components/ModalAppointmentDetail";
import { appointmentActions } from "./../../redux/actions/appointment.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import PaginationBar from "../../components/PaginationBar";
import ModalReview from "../../components/ModalReview";
import moment from "moment";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";

const generateStatus = (status) => {
  if (status === "new")
    return (
      <span className='badge bg-soft-primary text-capitalize'>{status}</span>
    );
  if (status === "accepted")
    return (
      <span className='badge bg-soft-success text-capitalize'>{status}</span>
    );
  if (status === "cancelled")
    return (
      <span className='badge bg-soft-danger text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-warning text-capitalize'>{status}</span>
  );
};

const AppointmentRow = ({ p, idx }) => {
  const [showModalAppointmentDetail, setShowModalAppointmentDetail] = useState(
    false
  );
  const [showModalReview, setShowModalReview] = useState(false);
  const history = useHistory();
  return (
    <tr key={p._id} className='border-bottom'>
      <th>{idx + 1}</th>
      <td>{moment(p?.time).format("ll")}</td>
      <td>{Date.parse(p.createdAt)}</td>
      <td
        onClick={() => history.push(`/doctors/${p?.doctor?._id}`)}
        style={{ cursor: "pointer" }}
      >
        {p.doctor.name}
      </td>
      <td>{p.doctor.field}</td>
      <td>{p.doctor.address.substring(0, 50)}</td>
      <td>{generateStatus(p.status)}</td>
      <td width='10%' className='pt-2'>
        <button
          className='btn btn-icon btn-pills btn-soft-primary btn-sm'
          onClick={() => setShowModalAppointmentDetail(true)}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        {p?.status === "done" && (
          <button
            className='btn btn-icon btn-pills btn-soft-success btn-sm ml-2'
            onClick={() => setShowModalReview(true)}
          >
            <FontAwesomeIcon icon={faComment} />
          </button>
        )}

        <ModalAppointmentDetail
          appointment={p}
          showModal={showModalAppointmentDetail}
          handleClose={() => setShowModalAppointmentDetail(false)}
        />
        <ModalReview
          doctor={p?.doctor}
          showModalReview={showModalReview}
          handleClose={() => setShowModalReview(false)}
        />
      </td>
    </tr>
  );
};

const UserAppointmentPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPages = useSelector((state) => state.appointment.totalPages);
  const appointments = useSelector((state) => state.appointment.appointments);
  const loading = useSelector((state) => state.appointment.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const options = [
    { value: "new", label: "New" },
    { value: "accepted", label: "Accepted" },
    { value: "done", label: "Done" },
    { value: "cancelled", label: "Cancelled" },
  ];
  const handlePageChange = (page) => {
    setPageNum(page.selected + 1);
  };
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(
        appointmentActions.getMyAppointments(
          currentUser._id,
          pageNum,
          null,
          selectedOption.value
        )
      );
    }
  }, [dispatch, currentUser, pageNum, selectedOption]);
  console.log("selectedOption", selectedOption);
  return (
    <>
      <Row>
        <Col className='mt-0 pt-2'>
          <Row className='justify-content-between my-3'>
            <Col md={3}>
              <div className='title-h5'>Appointment</div>
            </Col>
            <Col md={3}>
              <Select
                options={options}
                onChange={setSelectedOption}
                placeholder={`Filter by status`}
              />
            </Col>
          </Row>

          <div className='table-responsive rounded shadow mt-3'>
            <Table className='shadow rounded table table-center bg-white mb-0 table-borderless'>
              <thead>
                <tr className='border-bottom'>
                  <th>#</th>
                  <th>Appointment Date</th>
                  <th>Appointment ID</th>
                  <th>Doctor</th>
                  <th>Speciality</th>
                  <th>Private Clinic Address</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  appointments &&
                  appointments.length !== 0 &&
                  appointments.map((p, idx) => (
                    <>
                      <AppointmentRow p={p} idx={idx} key={p._id} />
                    </>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className='d-flex justify-content-end'>
            <PaginationBar
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              selectedPage={pageNum - 1}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserAppointmentPage;
