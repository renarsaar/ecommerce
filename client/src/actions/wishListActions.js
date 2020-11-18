import {
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  CLEAR_WISHLIST,
} from './types';

export const addWishlist = (productID) => ({ type: ADD_WISHLIST, productID });
export const removeWishlist = (id) => ({ type: REMOVE_WISHLIST, id });
export const clearWishlist = () => ({ type: CLEAR_WISHLIST });
