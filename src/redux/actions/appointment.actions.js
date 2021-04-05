import * as types from "../constants/appointment.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const createAppointment = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_APPOINTMENT_REQUEST, payload: null });
  try {
    const res = await api.post("/appointments", { formData });
    dispatch({
      type: types.CREATE_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
    toast.success(`Book an appointment successfully`);
  } catch (error) {
    dispatch({ type: types.CREATE_APPOINTMENT_FAILURE, payload: error });
  }
};

const getMyAppointments = (
  userId,
  pageNum = 1,
  limit = 10,
  status = null
) => async (dispatch) => {
  dispatch({ type: types.GET_MY_APPOINTMENT_REQUEST, payload: null });
  try {
    let statusString = "";
    if (status) {
      statusString = `&status=${status}`;
    }
    const res = await api.get(
      `/users/${userId}/appointments?page=${pageNum}&limit=${limit}${statusString}`
    );
    dispatch({
      type: types.GET_MY_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_MY_APPOINTMENT_FAILURE, payload: error });
  }
};

const getDoctorAppointments = (
  doctorId,
  pageNum = 1,
  limit = 10,
  status = null
) => async (dispatch) => {
  dispatch({ type: types.GET_DOCTOR_APPOINTMENT_REQUEST, payload: null });
  try {
    let statusString = "";
    if (status) {
      statusString = `&status=${status}`;
    }
    const res = await api.get(
      `/doctors/${doctorId}/appointments?page=${pageNum}&limit=${limit}${statusString}`
    );
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

const updateStatusAppointment = (appointmentId, status) => async (dispatch) => {
  dispatch({ type: types.UPDATE_STATUS_APPOINTMENT_REQUEST, payload: null });
  try {
    const res = await api.put(`/appointments/${appointmentId}/status`, {
      status,
    });
    dispatch({
      type: types.UPDATE_STATUS_APPOINTMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_STATUS_APPOINTMENT_FAILURE,
      payload: error,
    });
  }
};

export const appointmentActions = {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getSingleAppointment,
  updateAppointment,
  updateStatusAppointment,
};
