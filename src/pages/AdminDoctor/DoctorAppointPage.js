import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { appointmentActions } from "./../../redux/actions/appointment.actions";
import moment from "moment";
import { faCheck, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

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
const DoctorAppointPage = () => {
  const appointments = useSelector((state) => state.appointment.appointments);
  const loadingAppointments = useSelector((state) => state.appointment.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "new", label: "New" },
    { value: "accepted", label: "Accepted" },
    { value: "done", label: "Done" },
    { value: "cancelled", label: "Cancelled" },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(
        appointmentActions.getDoctorAppointments(
          currentUser._id,
          null,
          null,
          selectedOption?.value
        )
      );
    }
  }, [dispatch, currentUser, selectedOption]);

  return (
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
                <th>Patient Name</th>
                <th>Patient Age</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loadingAppointments &&
                appointments &&
                appointments.map((p, idx) => (
                  <>
                    <tr key={p._id} className='border-bottom'>
                      <th>{idx + 1}</th>
                      <td>{moment(p?.time).format("ll")}</td>
                      <td>{Date.parse(p.createdAt)}</td>
                      <td>{p.patientName}</td>
                      <td>{p.patientAge}</td>
                      <td>(+84){p.phone}</td>
                      <td>{generateStatus(p.status)}</td>
                      <td className='pt-2'>
                        {p?.status === "new" && (
                          <>
                            <button
                              className='btn btn-icon btn-pills btn-soft-success btn-sm ml-2'
                              //onClick={() => history.push(`appointments/${p._id}`)}
                              onClick={() =>
                                dispatch(
                                  appointmentActions.updateStatusAppointment(
                                    p._id,
                                    "accepted"
                                  )
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              className='btn btn-icon btn-pills btn-soft-danger btn-sm ml-2'
                              onClick={() =>
                                dispatch(
                                  appointmentActions.updateStatusAppointment(
                                    p._id,
                                    "cancelled"
                                  )
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </>
                        )}
                        {p?.status !== "new" && (
                          <button
                            className='btn btn-icon btn-pills btn-soft-primary btn-sm ml-2'
                            onClick={() =>
                              history.push(`appointments/${p._id}`)
                            }
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        )}
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
};

export default DoctorAppointPage;
