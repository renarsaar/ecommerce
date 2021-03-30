import {
  ADD_WISHLIST_LS,
  REMOVE_WISHLIST_LS,
  CLEAR_WISHLIST_LS,
  SET_WISHLIST_LS,
  SET_WISHLIST_DB,
  CHANGE_WISHLIST_DB,
  CHANGE_WISHLIST_DB_ERROR,
  CLEAR_WISHLIST_REDUCER,
} from '../actions/types';

const INITIAL_STATE = {
  wishListProducts: JSON.parse(localStorage.getItem('wishlist')) || [],
  wishListError: null,
};
let newWishList = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_WISHLIST_LS:
      if (state.wishListProducts.includes(action.productID)) {
        return {
          ...state,
          wishListProducts: [...state.wishListProducts],
        };
      }

      newWishList = [...state.wishListProducts, action.productID];

      localStorage.setItem('wishlist', JSON.stringify(newWishList));

      return {
        ...state,
        wishListProducts: JSON.parse(localStorage.getItem('wishlist')),
      };

    case REMOVE_WISHLIST_LS:
      newWishList = [...state.wishListProducts.filter((id) => id !== action.id)];
      localStorage.setItem('wishlist', JSON.stringify(newWishList));

      return {
        ...state,
        wishListProducts: JSON.parse(localStorage.getItem('wishlist')),
      };

    case SET_WISHLIST_LS:
      return {
        ...state,
        wishListProducts: action.wishListArr,
      };

    case SET_WISHLIST_DB:
      localStorage.removeItem('wishlist');

      return {
        ...state,
        wishListProducts: action.payload,
      };

    case CHANGE_WISHLIST_DB:
      localStorage.removeItem('wishlist');

      return {
        ...state,
        wishListProducts: action.payload,
        wishListError: null,
      };

    case CHANGE_WISHLIST_DB_ERROR:
      return {
        ...state,
        wishListError: action.payload,
      };

    case CLEAR_WISHLIST_LS:
      localStorage.removeItem('wishlist');

      return {
        ...state,
        wishListProducts: [],
        wishListError: null,
      };

    case CLEAR_WISHLIST_REDUCER:
      return {
        ...state,
        wishListError: null,
      };

    default:
      return state;
  }
};
