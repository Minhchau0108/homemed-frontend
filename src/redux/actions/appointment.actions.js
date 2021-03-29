import * as types from "../constants/appointment.constants";
import api from "../../apiService";

const createAppointment = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_APPOINTMENT_REQUEST, payload: null });
  try {
    const res = await api.post("/appointments", { formData });
    dispatch({
      type: types.CREATE_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_APPOINTMENT_FAILURE, payload: error });
  }
};

const getMyAppointments = (userId) => async (dispatch) => {
  dispatch({ type: types.GET_MY_APPOINTMENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/users/${userId}/appointments`);
    dispatch({
      type: types.GET_MY_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_MY_APPOINTMENT_FAILURE, payload: error });
  }
};

const getDoctorAppointments = (doctorId) => async (dispatch) => {
  dispatch({ type: types.GET_DOCTOR_APPOINTMENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/doctors/${doctorId}/appointments`);
    dispatch({
      type: types.GET_DOCTOR_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_DOCTOR_APPOINTMENT_FAILURE, payload: error });
  }
};

const getSingleAppointment = (appointmentId) => async (dispatch) => {
  dispatch({ type: types.GET_DETAIL_APPOINTMENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/appointments/${appointmentId}`);
    dispatch({
      type: types.GET_DETAIL_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_DETAIL_APPOINTMENT_FAILURE, payload: error });
  }
};

const updateAppointment = (
  appointmentId,
  patientInfo,
  diagnosis,
  prescription
) => async (dispatch) => {
  dispatch({ type: types.UPDATE_APPOINTMENT_REQUEST, payload: null });
  try {
    console.log("appointmentId", appointmentId);
    const res = await api.put(`/appointments/${appointmentId}`, {
      patientInfo,
      diagnosis,
      prescription,
    });
    dispatch({
      type: types.GET_DETAIL_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_DETAIL_APPOINTMENT_FAILURE, payload: error });
  }
};

export const appointmentActions = {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getSingleAppointment,
  updateAppointment,
};
