import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorPrescribing from "./DoctorPrescribing";
import { useParams } from "react-router-dom";
import { appointmentActions } from "../../redux/actions/appointment.actions";
import moment from "moment";
import AppointmentResult from "../../components/AppointmentResult";

const generateStatus = (status) => {
  if (status === "new")
    return (
      <span className='badge bg-soft-primary text-capitalize'>{status}</span>
    );
  if (status === "cancelled")
    return (
      <span className='badge bg-soft-danger text-capitalize'>{status}</span>
    );
  return (
    <span className='badge bg-soft-success text-capitalize'>{status}</span>
  );
};

const DoctorAppointDetail = () => {
  const appointment = useSelector(
    (state) => state.appointment.selectedAppointment
  );
  const loading = useSelector((state) => state.appointment.loading);
  const [showPrescribing, setShowPrescribing] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appointmentActions.getSingleAppointment(id));
  }, [dispatch, id]);
  console.log("appoinment", appointment);

  return (
    <>
      <div className='bg-white card border-0 p-2 mt-3 rounded'>
        <div className='d-flex justify-content-between'>
          <div className='title-h5 px-3'>Appointment Detail</div>
          <div>
            {!loading && appointment && appointment.status === "new" && (
              <button
                className='btn btn-primary btn-pills mr-3'
                onClick={() => setShowPrescribing(true)}
              >
                Add Prescription
              </button>
            )}
          </div>
        </div>
        {!loading && appointment && (
          <div className='row px-3'>
            <div className='col-sm-12'>
              <h6 className='mt-1'>
                <span>AppointmentID:</span> {Date.parse(appointment.createdAt)}
              </h6>
              <h6 className='pt-0'>
                Status: {generateStatus(appointment.status)}{" "}
              </h6>

              <div class='card border-0 shadow rounded'>
                <div class='card-body row'>
                  <div class='col-3'>
                    <strong>Apppointment Date</strong> <br />
                    {moment(appointment?.time).format("ll")}
                  </div>
                  <div class='col-3'>
                    <strong>Patient Name</strong> <br />
                    {appointment?.patientName}
                  </div>
                  <div class='col-3'>
                    <strong>Patient Age</strong> <br />
                    {appointment?.patientAge}
                  </div>
                  <div class='col-3'>
                    <strong>Reason for appointment</strong> <br />{" "}
                    {appointment?.note}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {appointment && showPrescribing && (
        <DoctorPrescribing appointment={appointment} />
      )}
      {!loading && appointment && appointment.status === "done" && (
        <AppointmentResult appointment={appointment} />
      )}
    </>
  );
};

export default DoctorAppointDetail;
