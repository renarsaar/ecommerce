import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  LOADING,
  ERROR,
} from './types';
import products from '../api/products';

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: LOADING });

  products.get('/products')
    .then((response) => dispatch({ type: FETCH_PRODUCTS, payload: response.data }))
    .catch((error) => dispatch({ type: ERROR, payload: { error } }));
};

// Fetch single product
export const fetchProduct = (id) => async (dispatch) => {

};

// Edit a product
export const editProduct = (id) => async (dispatch) => {

};

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {

};

// Create a product
export const createProduct = (id) => async (dispatch) => {

};
