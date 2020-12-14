import {
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  CLEAR_WISHLIST,
} from '../actions/types';

const INITIAL_STATE = JSON.parse(localStorage.getItem('wishlist')) || [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_WISHLIST:
      if (state.includes(action.productID)) {
        return [...state]
      }

      state = [...state, action.productID];
      localStorage.setItem('wishlist', JSON.stringify(state));

      return JSON.parse(localStorage.getItem('wishlist'));

    case REMOVE_WISHLIST:
      state = [...state.filter((id) => id !== action.id)];
      localStorage.setItem('wishlist', JSON.stringify(state));

      return JSON.parse(localStorage.getItem('wishlist'));

    case CLEAR_WISHLIST:
      state = [];
      localStorage.removeItem('wishlist');
      return state;

    default:
      return state;
  }
}