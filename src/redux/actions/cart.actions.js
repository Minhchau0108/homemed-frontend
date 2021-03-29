import * as types from "../constants/cart.constants";

const cartActions = {
  addProductToCart: (product, qty) => ({
    type: types.ADD_PRODUCT_TO_CART,
    payload: { product, qty },
  }),
  removeProductFromCart: (id) => ({
    type: types.REMOVE_PRODUCT_FROM_CART,
    payload: id,
  }),
  addQuantity: (id) => ({
    type: types.ADD_QUANTITY,
    payload: id,
  }),
  subQuantity: (id) => ({
    type: types.SUB_QUANTITY,
    payload: id,
  }),
  emptyCart: (id) => ({
    type: types.EMPTY_CART,
    payload: id,
  }),
  clearCart: () => ({
    type: types.CLEAR_CART,
  }),
};
export default cartActions;
