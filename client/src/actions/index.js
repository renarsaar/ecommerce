import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  LOADING,
  ERROR,
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  CLEAR_WISHLIST,
  ADD_CART,
  ADD_CART_QUANTITY,
  REMOVE_CART,
  CLEAR_CART,
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

// Handle Wishlist
export const addWishlist = (productID) => ({ type: ADD_WISHLIST, productID });
export const removeWishlist = (id) => ({ type: REMOVE_WISHLIST, id });
export const clearWishlist = () => ({ type: CLEAR_WISHLIST });

// Handle shopping cart
export const addCart = (product) => ({ type: ADD_CART, product });
export const removeCart = (index, productPrice) => ({ type: REMOVE_CART, index, productPrice });
export const clearCart = () => ({ type: CLEAR_CART });

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
