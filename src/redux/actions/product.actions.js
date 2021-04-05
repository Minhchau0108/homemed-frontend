import * as types from "../constants/product.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const productsRequest = (
  pageNum = 1,
  limit = 9,
  category = null,
  query = null,
  sortBy = null,
  price = { min: 0, max: 500000 }
) => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      //queryString = `&title[$regex]=${query}&title[$options]=i`;
      queryString = `&name=${query}`;
    }
    let categoryString = "";
    if (category) {
      categoryString = `&category=${category}`;
    }

    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }

    const res = await api.get(
      `/products?page=${pageNum}&limit=${limit}&min=${price?.min}&max=${price?.max}${categoryString}${queryString}${sortByString}`
    );
    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_PRODUCTS_FAILURE, payload: error });
  }
};
const getSingleProduct = (productId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.get(`/products/${productId}`);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: error });
  }
};

const getMainCategories = () => async (dispatch) => {
  dispatch({ type: types.GET_MAIN_CATEGORY_REQUEST, payload: null });
  try {
    const res = await api.get(`/categories/main-categories`);
    dispatch({
      type: types.GET_MAIN_CATEGORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_MAIN_CATEGORY_FAILURE, payload: error });
  }
};

const getSubCategories = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SUB_CATEGORY_REQUEST, payload: null });
  try {
    const res = await api.get(`/categories/sub-categories/${id}`);
    dispatch({
      type: types.GET_SUB_CATEGORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SUB_CATEGORY_FAILURE, payload: error });
  }
};
const createReview = (rating, content, productId) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews`, {
      rating: rating,
      content: content,
      targetType: "Product",
      targetId: productId,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
    toast.success(`Add review successfully`);
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};
const setSelectedCategory = (categoryId) => ({
  type: types.SET_SELECTED_CATEGORY,
  payload: categoryId,
});
const getAllSubCategories = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_SUB_CATEGORIES_REQUEST, payload: null });
  try {
    const res = await api.get(`/categories/sub-categories`);
    dispatch({
      type: types.GET_ALL_SUB_CATEGORIES_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_SUB_CATEGORIES_FAILURE, payload: error });
  }
};
const createNewProduct = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.post(`/products`, { formData });
    dispatch({
      type: types.CREATE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: error });
  }
};
export const productActions = {
  productsRequest,
  getSingleProduct,
  getMainCategories,
  getSubCategories,
  createReview,
  setSelectedCategory,
  getAllSubCategories,
  createNewProduct,
};
