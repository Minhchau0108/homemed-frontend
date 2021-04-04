import * as types from "../constants/order.constants";
import * as cartTypes from "../constants/cart.constants";
import { toast } from "react-toastify";
import api from "../../apiService";
import { prescriptionActions } from "./prescription.actions";

const createOrder = (order) => async (dispatch) => {
  dispatch({ type: types.CREATE_ORDER_REQUEST, payload: null });
  try {
    const res = await api.post("/orders", { order });
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: res.data.data });
    dispatch({ type: cartTypes.CLEAR_CART });
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAILURE, payload: error });
  }
};
const createOrderByAdmin = (order, prescriptionId) => async (dispatch) => {
  dispatch({ type: types.CREATE_BY_ADMIN_REQUEST, payload: null });
  try {
    const res = await api.post("/orders/admin", { order });
    dispatch({ type: types.CREATE_BY_ADMIN_SUCCESS, payload: res.data.data });
    toast.success(`Create order successfully`);
    dispatch(prescriptionActions.getSinglePrescription(prescriptionId));
  } catch (error) {
    dispatch({ type: types.CREATE_BY_ADMIN_FAILURE, payload: error });
  }
};

const getMyOrders = (userId, pageNum = 1, limit = 10, status = null) => async (
  dispatch
) => {
  dispatch({ type: types.GET_MY_ORDER_REQUEST, payload: null });
  try {
    let statusString = "";
    if (status) {
      statusString = `&status=${status}`;
    }
    const res = await api.get(
      `/users/${userId}/orders?page=${pageNum}&limit=${limit}${statusString}`
    );
    dispatch({ type: types.GET_MY_ORDER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_ALL_ORDERS_FAILURE, payload: error });
  }
};

const getAllOrders = (
  pageNum = 1,
  limit = 10,
  status = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDERS_REQUEST, payload: null });
  try {
    let statusString = "";
    if (status) {
      statusString = `&status=${status}`;
    }
    const res = await api.get(
      `/orders?page=${pageNum}&limit=${limit}${statusString}`
    );
    dispatch({ type: types.GET_ALL_ORDERS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_ALL_ORDERS_FAILURE, payload: error });
  }
};

const getSingleOrder = (orderId) => async (dispatch) => {
  dispatch({ type: types.GET_SELECTED_ORDER_REQUEST, payload: null });
  try {
    const res = await api.get(`/orders/${orderId}`);
    dispatch({
      type: types.GET_SELECTED_ORDER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SELECTED_ORDER_FAILURE, payload: error });
  }
};
const updateStatusOrder = (orderId, status) => async (dispatch) => {
  dispatch({ type: types.UPDATE_STATUS_ORDER_REQUEST, payload: null });
  try {
    const res = await api.put(`/orders/${orderId}/status`, {
      status,
    });
    dispatch({
      type: types.UPDATE_STATUS_ORDER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_STATUS_ORDER_FAILURE,
      payload: error,
    });
  }
};

export const orderActions = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getSingleOrder,
  updateStatusOrder,
  createOrderByAdmin,
};
