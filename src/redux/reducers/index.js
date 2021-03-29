import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import cartReducer from "./cart.reducer";
import orderReducer from "./order.reducer";
import postReducer from "./post.reducer";
import doctorReducer from "./doctor.reducer";
import appointmentReducer from "./appointment.reducer";
import prescriptionReducer from "./prescription.reducer";

export default combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  post: postReducer,
  doctor: doctorReducer,
  appointment: appointmentReducer,
  prescription: prescriptionReducer,
});
