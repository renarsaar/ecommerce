import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  LOADING,
  ERROR,
  SHOW_SHOP,
  SHOW_FABRIC,
  SHOW_JOURNAL,
  SHOW_ABOUT,
  SORT_OLDEST,
  SORT_NEWEST,
  SORT_CHEAPEST,
  SORT_EXPENSIVEST,
  SORT_NAME,
  SORT_DISCOUNT,
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
  dispatch({ type: LOADING });

  products.get(`/products/${id}`)
    .then((response) => dispatch({ type: FETCH_PRODUCT, payload: response.data }))
    .catch((error) => dispatch({ type: ERROR, payload: { error } }));
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

// Set menu navigation
export const showShop = () => ({ type: SHOW_SHOP });
export const showFabric = () => ({ type: SHOW_FABRIC });
export const showJournal = () => ({ type: SHOW_JOURNAL });
export const showAbout = () => ({ type: SHOW_ABOUT });

// Handle products sorting
export const sortOldest = () => ({ type: SORT_OLDEST });
export const sortNewest = () => ({ type: SORT_NEWEST });
export const sortCheapest = () => ({ type: SORT_CHEAPEST });
export const sortExpensivest = () => ({ type: SORT_EXPENSIVEST });
export const sortName = () => ({ type: SORT_NAME });
export const sortDiscount = () => ({ type: SORT_DISCOUNT });
