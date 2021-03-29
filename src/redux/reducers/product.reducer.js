import * as types from "../constants/product.constants";

const initialState = {
  products: [],
  totalPages: 1,
  selectedProduct: null,
  loading: false,
  categories: [],
  selectedCategory: null,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
    case types.GET_SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case types.GET_MAIN_CATEGORY_REQUEST:
    case types.GET_SUB_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case types.GET_MAIN_CATEGORY_SUCCESS:
    case types.GET_SUB_CATEGORY_SUCCESS:
    case types.GET_ALL_SUB_CATEGORIES_SUCCESS:
      return { ...state, categories: payload.categories, loading: false };

    case types.GET_MAIN_CATEGORY_FAILURE:
    case types.GET_SUB_CATEGORY_FAILURE:
      return { ...state, loading: false };

    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
        totalPages: payload.totalPages,
      };

    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, selectedProduct: payload.product, loading: false };

    case types.CREATE_REVIEW_SUCCESS:
      return { ...state, selectedProduct: payload.result, loading: false };

    case types.GET_PRODUCTS_FAILURE:
    case types.GET_SINGLE_PRODUCT_FAILURE:
      return { ...state, loading: false };

    case types.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: payload };

    default:
      return state;
  }
};

export default productReducer;
