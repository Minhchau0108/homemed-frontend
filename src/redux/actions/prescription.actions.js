import * as types from "../constants/prescription.constants";
import api from "../../apiService";

const createPrescription = (prescription) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRESCRIPTION_REQUEST, payload: null });
  try {
    const res = await api.post("/prescriptions", { prescription });
    dispatch({
      type: types.CREATE_PRESCRIPTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_PRESCRIPTION_FAILURE, payload: error });
  }
};

const getMyPrescriptions = (
  userId,
  pageNum = 1,
  limit = 10,
  status = null
) => async (dispatch) => {
  dispatch({ type: types.GET_MY_PRESCRIPTION_REQUEST, payload: null });
  try {
    let statusString = "";
    if (status) {
      statusString = `&status=${status}`;
    }
    const res = await api.get(
      `/users/${userId}/prescriptions?page=${pageNum}&limit=${limit}${statusString}`
    );

    dispatch({
      type: types.GET_MY_PRESCRIPTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_MY_PRESCRIPTION_FAILURE, payload: error });
  }
};

const getMyPrescriptionsDashboard = (userId) => async (dispatch) => {
  dispatch({
    type: types.GET_MY_PRESCRIPTION_DASHBOARD_REQUEST,
    payload: null,
  });
  try {
    const res = await api.get(`/users/${userId}/prescriptions/dashboard`);

    dispatch({
      type: types.GET_MY_PRESCRIPTION_DASHBOARD_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_MY_PRESCRIPTION_DASHBOARD_FAILURE,
      payload: error,
    });
  }
};

const getAllPrescriptions = (
  pageNum = 1,
  limit = 10,
  status = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_PRESCRIPTIONS_REQUEST, payload: null });
  try {
    let statusString = "";
    if (status) {
      statusString = `&status=${status}`;
    }
    const res = await api.get(
      `/prescriptions?page=${pageNum}&limit=${limit}${statusString}`
    );
    dispatch({
      type: types.GET_ALL_PRESCRIPTIONS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_PRESCRIPTIONS_FAILURE, payload: error });
  }
};
const getSinglePrescription = (prescriptionId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRESCRIPTION_REQUEST, payload: null });
  try {
    const res = await api.get(`/prescriptions/${prescriptionId}`);
    dispatch({
      type: types.GET_SINGLE_PRESCRIPTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_PRESCRIPTION_FAILURE, payload: error });
  }
};
const updateStatusPrescription = (prescriptionId, status) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_STATUS_PRESCRIPTION_REQUEST, payload: null });
  try {
    const res = await api.put(`/prescriptions/${prescriptionId}/status`, {
      status,
    });
    dispatch({
      type: types.UPDATE_STATUS_PRESCRIPTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_STATUS_PRESCRIPTION_FAILURE,
      payload: error,
    });
  }
};

export const prescriptionActions = {
  createPrescription,
  getMyPrescriptions,
  getAllPrescriptions,
  getSinglePrescription,
  updateStatusPrescription,
  getMyPrescriptionsDashboard,
};
