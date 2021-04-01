import * as types from "../constants/post.constants";

const initialState = {
  posts: [],
  totalPages: 1,
  selectedPost: null,
  categories: [],
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_POSTS_REQUEST:
    case types.GET_SINGLE_POST_REQUEST:
    case types.GET_POSTS_BY_DOCTOR_REQUEST:
    case types.GET_POSTS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case types.GET_POSTS_SUCCESS:
    case types.GET_POSTS_BY_DOCTOR_SUCCESS:
    case types.GET_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload.posts,
        totalPages: payload.totalPages,
      };

    case types.GET_SINGLE_POST_SUCCESS:
      return { ...state, selectedPost: payload.post, loading: false };

    case types.GET_SUB_CATEGORIES_SUCCESS:
      return { ...state, categories: payload.categories, loading: false };

    case types.CREATE_COMMENT_SUCCESS:
      console.log("payload", payload);
      console.log("payload", payload.result);
      console.log("payload id", payload.result._id);
      return {
        ...state,
        loading: false,
        posts: [
          ...state.posts.map((p) => {
            if (p._id !== payload.result._id) return p;
            return { ...p, reviews: payload.result.reviews };
          }),
        ],
      };

    case types.CREATE_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [
          ...state.posts.map((p) => {
            if (p._id !== payload.post._id) return p;
            return { ...p, reactions: payload.post.reactions };
          }),
        ],
      };

    case types.GET_POSTS_FAILURE:
    case types.GET_SINGLE_POST_FAILURE:
    case types.GET_POSTS_BY_DOCTOR_FAILURE:
    case types.GET_POSTS_BY_CATEGORY_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default postReducer;
