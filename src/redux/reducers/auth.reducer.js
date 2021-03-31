import * as types from "../constants/auth.constants";

const isAuthenticated = !!localStorage.getItem("accessToken");
const initialState = {
  loading: false,
  isAuthenticated,
  accessToken: localStorage.getItem("accessToken"),
  user: {},
  customers: [],
  totalPages: 1,
  dashboard: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.LOGIN_FACEBOOK_REQUEST:
    case types.LOGIN_GOOGLE_REQUEST:
    case types.REGISTER_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
    case types.GET_ALL_CUSTOMER_REQUEST:
    case types.GET_ADMIN_DASHBOARD_REQUEST:
      return { ...state, loading: true };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.LOGIN_SUCCESS:
    case types.LOGIN_FACEBOOK_SUCCESS:
    case types.LOGIN_GOOGLE_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        loading: false,
        user: payload.user,
        isAuthenticated: true,
        accessToken: payload.accessToken,
      };

    case types.GET_ADMIN_DASHBOARD_SUCCESS:
      return { ...state, loading: false, dashboard: payload.dashboard };

    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        isAuthenticated: true,
      };

    case types.GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: payload.customers,
        totalPages: payload.totalPages,
        loading: false,
      };

    case types.REGISTER_FAILURE:
    case types.GET_ALL_CUSTOMER_FAILURE:
    case types.GET_ADMIN_DASHBOARD_FAILURE:
      return { ...state, loading: false };

    case types.LOGIN_FAILURE:
    case types.LOGIN_FACEBOOK_FAILURE:
    case types.LOGIN_GOOGLE_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
