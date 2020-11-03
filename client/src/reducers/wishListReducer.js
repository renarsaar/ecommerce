import {
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  CLEAR_WISHLIST,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_WISHLIST:
      if (state.includes(action.productID)) return [...state]

      return [...state, action.productID];

    case REMOVE_WISHLIST:
      return [...state.filter((id) => id !== action.id)];

    case CLEAR_WISHLIST:
      return [];

    default:
      return state;
  }
}