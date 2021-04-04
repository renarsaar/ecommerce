import {
  LOADING,
  ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT,
  EDIT_PRODUCT_ERROR,
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  CLEAR_PRODUCT_REDUCER,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  editProductLoading: false,
  addProductLoading: false,
  editProduct: null,
  addProduct: null,
  selectedProduct: null,
  paginatedProducts: [],
  products: [],
  next: null,
  previous: null,
  editProductError: null,
  addProductError: null,
  deleteProductError: null,
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

    case ADD_PRODUCT_LOADING:
      return {
        ...state,
        addProductLoading: true,
        addProduct: null,
        addProductError: null,
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

    case ADD_PRODUCT:
      return {
        ...state,
        addProductLoading: false,
        addProduct: action.payload,
        addProductError: null,
      };

    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        editProductLoading: false,
        editProduct: null,
        editProductError: action.payload,
      };

    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        addProductLoading: false,
        addProduct: null,
        addProductError: action.payload,
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

    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleteProductError: action.payload,
      };

    case CLEAR_PRODUCT_REDUCER:
      return {
        ...state,
        editProductLoading: false,
        editProduct: null,
        editProductError: null,
        addProductLoading: false,
        addProduct: null,
        addProductError: null,
        deleteProductError: null,
      };

    default:
      return state;
  }
};
