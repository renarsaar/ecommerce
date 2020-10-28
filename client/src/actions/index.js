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
  SET_FILTER_APPARELTERM,
  SET_FILTER_BRANDTERM,
  RESET_FILTERS,
} from './types';
import product from '../api/product';

// Fetch all products
export const fetchProducts = (page) => async (dispatch) => {
  dispatch({ type: LOADING });

  product.get('/products', {
    params: {
      page,
      limit: 6,
    }
  })
    .then((response) => dispatch({ type: FETCH_PRODUCTS, payload: response.data }))
    .catch((error) => dispatch({ type: ERROR, payload: { error } }));
};

// Fetch single product
export const fetchProduct = (id) => async (dispatch) => {
  dispatch({ type: LOADING });

  product.get(`/products/${id}`)
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
export const sortProducts = (value, products) => ({ type: value, products });

// Handle products filtering
export const setFilterApparelTerm = (apparelTerm, products) => ({ type: SET_FILTER_APPARELTERM, apparelTerm, products });
export const setFilterBrandTerm = (brandTerm, products) => ({ type: SET_FILTER_BRANDTERM, brandTerm, products });
export const resetFilters = () => ({ type: RESET_FILTERS });
