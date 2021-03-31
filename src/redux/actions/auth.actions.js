import * as types from "../constants/auth.constants";
import * as cartTypes from "../constants/cart.constants";
import { toast } from "react-toastify";
import api from "../../apiService";

const loginRequest = (email, password) => async (dispatch) => {
  console.log(email, password);
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    const name = res.data.user.name;
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    toast.success(`Welcome ${name}`);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const register = (name, email, password, avatarUrl) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password, avatarUrl });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    // dispatch(routeActions.redirect("/auth"));
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};
const loginFacebookRequest = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/facebook", { access_token });
    const name = res.data.user.name;
    toast.success(`Welcome ${name}`);
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
  }
};

const loginGoogleRequest = (access_token) => async (dispatch) => {
  console.log(access_token);
  dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/google", { access_token });
    const name = res.data.user.name;
    toast.success(`Welcome ${name}`);
    dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  //delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
  dispatch({ type: cartTypes.CLEAR_CART });
};
const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};
const updateProfile = (formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST });
  try {
    await api.put("/users", {
      formData,
    });
    dispatch(getCurrentUser());
  } catch (error) {
    dispatch({ type: types.UPDATE_PROFILE_FAILURE });
  }
};

const getAllCustomers = (pageNum = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_CUSTOMER_REQUEST, payload: null });
  try {
    const res = await api.get(
      `/users/customers?page=${pageNum}&limit=${limit}`
    );
    dispatch({ type: types.GET_ALL_CUSTOMER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_ALL_CUSTOMER_FAILURE, payload: error });
  }
};
export const authActions = {
  loginFacebookRequest,
  loginGoogleRequest,
  loginRequest,
  register,
  logout,
  getCurrentUser,
  updateProfile,
  getAllCustomers,
};
