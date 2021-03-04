import {
  GET_REVIEWS_LOADING,
  GET_REVIEWS,
  GET_REVIEWS_ERROR,
  POST_REVIEW_LOADING,
  POST_REVIEW,
  POST_REVIEW_ERROR,
  CLEAR_POST_REVIEW,
} from '../actions/types';

const INITIAL_STATE = {
  reviewsLoading: false,
  reviews: null,
  reviewsError: null,
  postReviewLoading: false,
  postReview: null,
  postReviewError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REVIEWS_LOADING:
      return {
        ...state,
        reviewsLoading: true,
        reviews: null,
        reviewsError: null,
      }

    case GET_REVIEWS:
      return {
        ...state,
        reviewsLoading: false,
        reviews: action.payload,
        reviewsError: null,
      }

    case GET_REVIEWS_ERROR:
      return {
        ...state,
        reviewsLoading: false,
        reviews: null,
        reviewsError: action.payload,
      }

    case POST_REVIEW_LOADING:
      return {
        ...state,
        postReviewLoading: true,
        postReview: null,
        postReviewError: null,
      }

    case POST_REVIEW:
      return {
        ...state,
        postReviewLoading: false,
        postReview: action.payload,
        postReviewError: null,
      }

    case POST_REVIEW_ERROR:
      return {
        ...state,
        postReviewLoading: false,
        postReview: null,
        postReviewError: action.payload,
      }

    case CLEAR_POST_REVIEW:
      return {
        ...state,
        postReviewLoading: false,
        postReview: null,
        postReviewError: null,
      }

    default:
      return state;
  }
};
