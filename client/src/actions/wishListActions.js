import {
  ADD_WISHLIST_LS,
  REMOVE_WISHLIST_LS,
  CLEAR_WISHLIST_LS,
  SET_WISHLIST_LS,
  SET_WISHLIST_DB,
  CHANGE_WISHLIST_DB,
  CHANGE_WISHLIST_DB_ERROR,
  CLEAR_WISHLIST_REDUCER,
} from './types';
import api from '../api';

export const addWishlistLS = (productID) => ({
  type: ADD_WISHLIST_LS, productID,
});

export const removeWishlistLS = (id) => ({
  type: REMOVE_WISHLIST_LS, id,
});

export const clearWishlistLS = () => ({
  type: CLEAR_WISHLIST_LS,
});

// Save user wishlist in Local Storage
export const setWishListLS = (wishListArr) => ({
  type: SET_WISHLIST_LS, wishListArr,
});

// Edit user wishlist
export const changeWishListDB = (productID, token, userID) => async (dispatch) => {
  // Change wishList in database
  api.patch(`/auth/wishlist/${userID}`, {
    productID,
  }, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: CHANGE_WISHLIST_DB, payload: response.data }))
    .catch((err) => dispatch({ type: CHANGE_WISHLIST_DB_ERROR, payload: err.response.data }));
};

// Rewrite user wishList in database
export const setWishListDB = (userId, newWishListArray, token) => async (dispatch) => {
  api.patch(`/auth/wishlist/rewrite/${userId}`, {
    newWishListArray,
  }, {
    headers: {
      'x-auth-token': token,
    }
  })
    .then((response) => dispatch({ type: SET_WISHLIST_DB, payload: response.data }))
    .catch((error) => console.log(error));
};

export const clearWishListReducer = () => (dispatch) => {
  dispatch({ type: CLEAR_WISHLIST_REDUCER });
};
