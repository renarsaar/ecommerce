import {
  ADD_CART,
  REMOVE_CART,
  CLEAR_CART,
} from './types';

export const addCart = (product) => ({ type: ADD_CART, product });
export const removeCart = (index, productPrice) => ({ type: REMOVE_CART, index, productPrice });
export const clearCart = () => ({ type: CLEAR_CART });
