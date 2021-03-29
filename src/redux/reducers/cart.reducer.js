import * as types from "../constants/cart.constants";
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  cartCount: localStorage.getItem("cartCount") || 0,
  totalPrice: localStorage.getItem("totalPrice") || 0,
};
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newCart;
  let newTotalPrice;
  let newCartCount;

  switch (type) {
    case types.ADD_PRODUCT_TO_CART:
      console.log("payload", payload);
      if (state.cart.length === 0) {
        newCart = [...state.cart, { ...payload.product, qty: payload.qty }];
      }
      if (state.cart.length !== 0) {
        let check = false;
        state.cart.map((item) => {
          if (item._id === payload.product._id) {
            item.qty += payload.qty;
            check = true;
          }
          return item;
        });
        if (check) {
          newCart = state.cart;
        }
        if (!check) {
          newCart = [...state.cart, { ...payload.product, qty: payload.qty }];
        }
      }
      newTotalPrice = newCart.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
      newCartCount = newCart.reduce((total, item) => total + item.qty, 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("cartCount", newCartCount);
      localStorage.setItem("totalPrice", newTotalPrice);

      return {
        ...state,
        cart: newCart,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      };

    case types.ADD_QUANTITY:
      newCart = state.cart.map((product) =>
        product._id === payload ? { ...product, qty: product.qty + 1 } : product
      );
      newTotalPrice = newCart.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
      newCartCount = newCart.reduce((total, item) => total + item.qty, 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("cartCount", newCartCount);
      localStorage.setItem("totalPrice", newTotalPrice);

      return {
        ...state,
        cart: newCart,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      };

    case types.SUB_QUANTITY:
      newCart = state.cart.map((product) =>
        product._id === payload
          ? {
              ...product,
              qty: product.qty !== 1 ? product.qty - 1 : 1,
            }
          : product
      );
      newTotalPrice = newCart.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
      newCartCount = newCart.reduce((total, item) => total + item.qty, 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("cartCount", newCartCount);
      localStorage.setItem("totalPrice", newTotalPrice);
      return {
        ...state,
        cart: newCart,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      };

    case types.EMPTY_CART:
      newCart = state.cart.filter((product) => product._id !== payload);
      newTotalPrice = newCart.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
      newCartCount = newCart.reduce((total, item) => total + item.qty, 0);

      if (newCart.length !== 0) {
        localStorage.setItem("cart", JSON.stringify(newCart));
        localStorage.setItem("cartCount", newCartCount);
        localStorage.setItem("totalPrice", newTotalPrice);
      }
      if (newCart.length === 0) {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartCount");
        localStorage.removeItem("totalPrice");
      }

      return {
        ...state,
        cart: newCart,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      };
    case types.CLEAR_CART:
      localStorage.removeItem("cart");
      localStorage.removeItem("cartCount");
      localStorage.removeItem("totalPrice");
      return {
        ...state,
        cart: [],
        totalPrice: 0,
        cartCount: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
