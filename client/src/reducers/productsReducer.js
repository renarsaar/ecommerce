import {
  LOADING,
  ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT,
  EDIT_PRODUCT_ERROR,
  CLEAR_EDIT_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  editProductLoading: false,
  editProduct: null,
  selectedProduct: null,
  paginatedProducts: [],
  products: [],
  next: null,
  previous: null,
  editProductError: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        selectedProduct: null,
        paginatedProducts: [],
      };

    case EDIT_PRODUCT_LOADING:
      return {
        ...state,
        editProductLoading: true,
        editProduct: null,
        editProductError: null,
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
        selectedProduct: action.payload,
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        editProductLoading: false,
        editProduct: action.payload,
        editProductError: null,
      };

    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        editProductLoading: false,
        editProduct: null,
        editProductError: action.payload,
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

    case CLEAR_EDIT_PRODUCT:
      return {
        ...state,
        editProductLoading: false,
        editProduct: null,
        editProductError: null,
      };

    default:
      return state;
  }
};
