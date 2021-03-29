import * as types from "../constants/post.constants";
import api from "../../apiService";

const postsRequest = (
  pageNum = 1,
  limit = 10,
  category = null,
  query = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_POSTS_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&title[$regex]=${query}&title[$options]=i`;
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
      `/posts?page=${pageNum}&limit=${limit}${categoryString}${queryString}${sortByString}`
    );
    dispatch({
      type: types.GET_POSTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_POSTS_FAILURE, payload: error });
  }
};
const getSinglePost = (postId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_POST_REQUEST, payload: null });
  try {
    const res = await api.get(`/posts/${postId}`);
    dispatch({
      type: types.GET_SINGLE_POST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_POST_FAILURE, payload: error });
  }
};
const getPostsByDoctor = (doctorId) => async (dispatch) => {
  dispatch({ type: types.GET_POSTS_BY_DOCTOR_REQUEST, payload: null });
  try {
    const res = await api.get(`/posts/doctors/${doctorId}`);
    dispatch({
      type: types.GET_POSTS_BY_DOCTOR_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_POSTS_BY_DOCTOR_FAILURE, payload: error });
  }
};
const createComment = (rating = 5, content, postId) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMMENT_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews`, {
      rating: rating,
      content: content,
      targetType: "Post",
      targetId: postId,
    });
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

const createReaction = (postId, emoji) => async (dispatch) => {
  dispatch({ type: types.CREATE_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`/reactions`, {
      postId,
      emoji,
    });
    dispatch({
      type: types.CREATE_REACTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REACTION_FAILURE, payload: error });
  }
};

const getSubCategories = () => async (dispatch) => {
  dispatch({ type: types.GET_SUB_CATEGORIES_REQUEST, payload: null });
  try {
    const res = await api.get(`/categories/sub-categories`);
    dispatch({
      type: types.GET_SUB_CATEGORIES_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SUB_CATEGORIES_FAILURE, payload: error });
  }
};
const createNewPost = (title, body, image, category) => async (dispatch) => {
  dispatch({ type: types.CREATE_POST_REQUEST, payload: null });
  try {
    const res = await api.post(`/posts`, { title, body, image, category });
    dispatch({
      type: types.CREATE_POST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error });
  }
};
export const postActions = {
  postsRequest,
  getSinglePost,
  getPostsByDoctor,
  createReaction,
  createComment,
  getSubCategories,
  createNewPost,
};
