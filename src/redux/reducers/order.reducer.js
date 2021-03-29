import * as types from "../constants/order.constants";
const initialState = {
  orders: [],
  totalPages: 1,
  selectedOrder: {},
};
const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_MY_ORDER_REQUEST:
    case types.GET_ALL_ORDERS_REQUEST:
    case types.GET_SELECTED_ORDER_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false };

    case types.GET_MY_ORDER_SUCCESS:
    case types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
        totalPages: payload.totalPages,
        loading: false,
      };

    case types.GET_SELECTED_ORDER_SUCCESS:
      return { ...state, selectedOrder: payload.order, loading: false };

    case types.UPDATE_STATUS_ORDER_SUCCESS:
      console.log("payload", payload.order);
      return { ...state, selectedOrder: payload.order, loading: false };

    case types.CREATE_ORDER_FAILURE:
    case types.GET_MY_ORDER_FAILURE:
    case types.GET_ALL_ORDERS_FAILURE:
    case types.GET_SELECTED_ORDER_FAILURE:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default orderReducer;
