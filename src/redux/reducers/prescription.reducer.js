import * as types from "../constants/prescription.constants";
const initialState = {
  prescriptions: [],
  selectedPrescription: {},
  totalPages: 1,
};
const prescriptionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_PRESCRIPTION_REQUEST:
    case types.GET_MY_PRESCRIPTION_REQUEST:
    case types.GET_ALL_PRESCRIPTIONS_REQUEST:
    case types.GET_SINGLE_PRESCRIPTION_REQUEST:
    case types.UPDATE_STATUS_PRESCRIPTION_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_PRESCRIPTION_SUCCESS:
      return { ...state, loading: false };

    case types.GET_MY_PRESCRIPTION_SUCCESS:
    case types.GET_ALL_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        prescriptions: payload.prescriptions,
        totalPages: payload.totalPages,
        loading: false,
      };

    case types.GET_MY_PRESCRIPTION_DASHBOARD_SUCCESS:
      return {
        ...state,
        prescriptions: payload.prescriptions,
      };

    case types.GET_SINGLE_PRESCRIPTION_SUCCESS:
    case types.UPDATE_STATUS_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        selectedPrescription: payload.prescription,
        loading: false,
      };

    case types.CREATE_PRESCRIPTION_FAILURE:
    case types.GET_MY_PRESCRIPTION_FAILURE:
    case types.GET_ALL_PRESCRIPTIONS_FAILURE:
    case types.GET_SINGLE_PRESCRIPTION_FAILURE:
    case types.UPDATE_STATUS_PRESCRIPTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default prescriptionReducer;
