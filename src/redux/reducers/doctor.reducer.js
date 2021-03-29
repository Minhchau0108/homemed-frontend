import * as types from "../constants/doctor.constants";

const initialState = {
  doctors: [],
  totalPages: 1,
  selectedDoctor: null,
};

const doctorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_DOCTORS_REQUEST:
    case types.GET_SINGLE_DOCTOR_REQUEST:
      return { ...state, loading: true };

    case types.GET_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: payload.doctors,
        totalPages: payload.totalPages,
      };

    case types.GET_SINGLE_DOCTOR_SUCCESS:
      return { ...state, selectedDoctor: payload.doctor, loading: false };

    case types.GET_DOCTORS_FAILURE:
    case types.GET_SINGLE_DOCTOR_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default doctorReducer;
