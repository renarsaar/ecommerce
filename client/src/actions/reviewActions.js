import {
  GET_REVIEWS_LOADING,
  GET_REVIEWS,
  GET_REVIEWS_ERROR,
  POST_REVIEW_LOADING,
  POST_REVIEW,
  POST_REVIEW_ERROR,
  CLEAR_POST_REVIEW,
} from './types';
import api from '../api';

// Get all reviews
export const getReviewsAction = (productId) => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_LOADING });

  api.get(`/reviews/${productId}`)
    .then((response) => dispatch({ type: GET_REVIEWS, payload: response.data }))
    .catch((error) => dispatch({ type: GET_REVIEWS_ERROR, payload: error.message }));
};

// Post a new review
export const postReviewAction = (productId, reviewerName, review, rating) => async (dispatch) => {
  dispatch({ type: POST_REVIEW_LOADING });

  api.post('/reviews', {
    productId,
    rating,
    reviewerName,
    review,
  })
    .then((response) => dispatch({ type: POST_REVIEW, payload: response.data }))
    .catch((error) => {
      dispatch({ type: POST_REVIEW_ERROR, payload: error.response.data })
    });
};

// Clear postReview reducer
export const clearPostReview = () => (dispatch) => {
  dispatch({ type: CLEAR_POST_REVIEW });
};
