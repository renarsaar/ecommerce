import {
  ADD_CART,
  ADD_CART_ONE,
  REMOVE_CART,
  CLEAR_CART,
} from './types';

export const addCart = (product) => ({ type: ADD_CART, product });
export const addCartOne = (index) => ({ type: ADD_CART_ONE, index });
export const removeCart = (index) => ({ type: REMOVE_CART, index });
export const clearCart = () => ({ type: CLEAR_CART });
