import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT,
  EDIT_PRODUCT_ERROR,
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  CLEAR_PRODUCT_REDUCER,
  DELETE_PRODUCT,
  LOADING,
  ERROR,
} from './types';
import history from '../history';
import api from '../api';

// Fetch all products
export const fetchProducts = (page, sortValue) => async (dispatch) => {
  dispatch({ type: LOADING });

  api.get('/products', {
    params: {
      page,
      limit: 9,
      sortValue,
    },
  })
    .then((response) => dispatch({ type: FETCH_PRODUCTS, payload: response.data }))
    .catch((error) => dispatch({ type: ERROR, payload: { error } }));
};

// Fetch single product
export const fetchProduct = (id) => async (dispatch) => {
  dispatch({ type: LOADING });

  api.get(`/products/${id}`)
    .then((response) => dispatch({ type: FETCH_PRODUCT, payload: response.data }))
    .catch((error) => dispatch({ type: ERROR, payload: { error } }));
};

// Edit a product
export const editProductAction = (id, token, formData) => async (dispatch) => {
  dispatch({ type: EDIT_PRODUCT_LOADING });

  api.patch(`/products/${id}`, formData, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      dispatch({ type: EDIT_PRODUCT, payload: response.data });

      history.push({ pathname: `/products/${id}`, state: { editProduct: true } });
    })
    .catch((error) => dispatch({ type: EDIT_PRODUCT_ERROR, payload: error.response.data }));
};

// Add a new product
export const addProductAction = (token, formData) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_LOADING });

  api.post('/products', formData, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      dispatch({ type: ADD_PRODUCT, payload: response.data });

      history.push({ pathname: '/', state: { addProduct: true } });
    })
    .catch((error) => dispatch({ type: ADD_PRODUCT_ERROR, payload: error.response.data }));
};

// Clear product reducer
export const clearProductReducer = () => (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_REDUCER });
};

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {

};

// Create a product
export const createProduct = (id) => async (dispatch) => {

};
