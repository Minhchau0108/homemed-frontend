import * as types from "../constants/doctor.constants";

import api from "../../apiService";

const getAllDoctors = (
  pageNum = 1,
  limit = 8,
  field = null,
  query = null
) => async (dispatch) => {
  dispatch({ type: types.GET_DOCTORS_REQUEST, payload: null });
  try {
    //const res = await api.get(`/doctors`);
    let fieldString = "";
    if (field) {
      fieldString = `&field=${field}`;
    }
    let queryString = "";
    if (query) {
      //queryString = `&title[$regex]=${query}&title[$options]=i`;
      queryString = `&name=${query}`;
    }
    const res = await api.get(
      `/doctors?page=${pageNum}&limit=${limit}${fieldString}${queryString}`
    );
    dispatch({ type: types.GET_DOCTORS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_DOCTORS_FAILURE, payload: error });
  }
};

const getSingleDoctor = (doctorId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_DOCTOR_REQUEST, payload: null });
  try {
    const res = await api.get(`/doctors/${doctorId}`);
    dispatch({
      type: types.GET_SINGLE_DOCTOR_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_DOCTOR_FAILURE, payload: error });
  }
};
const registerDoctor = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_DOCTOR_REQUEST, payload: null });
  try {
    const res = await api.post("/users/doctors", { formData });
    dispatch({ type: types.CREATE_DOCTOR_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.CREATE_DOCTOR_FAILURE, payload: error });
  }
};
const createReview = (rating, content, doctorId) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews`, {
      rating: rating,
      content: content,
      targetType: "Doctor",
      targetId: doctorId,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};
export const doctorActions = {
  getAllDoctors,
  getSingleDoctor,
  registerDoctor,
  createReview,
};
