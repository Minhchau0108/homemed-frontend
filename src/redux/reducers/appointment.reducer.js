import * as types from "../constants/appointment.constants";
const initialState = {
  appointments: [],
  totalPages: 1,
  selectedAppointment: {},
};
const appointmentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_APPOINTMENT_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_APPOINTMENT_SUCCESS:
      return { ...state, loading: false };

    case types.CREATE_APPOINTMENT_FAILURE:
      return { ...state, loading: false };

    case types.GET_MY_APPOINTMENT_REQUEST:
    case types.GET_DOCTOR_APPOINTMENT_REQUEST:
      return { ...state, loading: true };

    case types.GET_DETAIL_APPOINTMENT_SUCCESS:
    case types.UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        selectedAppointment: payload.appointment,
        loading: true,
      };

    case types.GET_MY_APPOINTMENT_SUCCESS:
    case types.GET_DOCTOR_APPOINTMENT_SUCCESS:
      return { ...state, appointments: payload.appointments, loading: false };

    case types.GET_MY_APPOINTMENT_FAILURE:
    case types.GET_DOCTOR_APPOINTMENT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default appointmentReducer;
