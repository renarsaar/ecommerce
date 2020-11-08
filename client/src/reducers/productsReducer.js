import {
  LOADING,
  ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        selectedProduct: null,
        paginatedProducts: [],
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
        paginatedProducts: [],
        next: null,
        previous: null,
      };

    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload.results,
        paginatedProducts: action.payload.paginatedResults,
        next: action.payload.next,
        previous: action.payload.previous,
      };

    case FETCH_PRODUCT:
      return {
        ...state,
        loading: false,
        error: false,
        selectedProduct: action.payload
      };

    // case EDIT_PRODUCT:
    //   return { ...state, [action.payload.id]: action.payload };

    // case DELETE_PRODUCT:
    //   return _.omit(state, action.payload);

    // case CREATE_PRODUCT:
    //   return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
