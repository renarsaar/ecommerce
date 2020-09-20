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

// Set menu to Shop
export const showShop = () => {
  return { type: SHOW_SHOP };
}

// Set menu to Fabric
export const showFabric = () => {
  return { type: SHOW_FABRIC };
}

// Set menu to Journal
export const showJournal = () => {
  return { type: SHOW_JOURNAL };
}

// Set menu to About
export const showAbout = () => {
  return { type: SHOW_ABOUT };
}

// Sort products by oldest
export const sortOldest = () => {
  return { type: SORT_OLDEST };
}

// Sort products by newest
export const sortNewest = () => {
  return { type: SORT_NEWEST };
}

// Sort products by cheapest  
export const sortCheapest = () => {
  return { type: SORT_CHEAPEST };
}

// Sort products by price  
export const sortExpensivest = () => {
  return { type: SORT_EXPENSIVEST };
}

// Sort products by name
export const sortName = () => {
  return { type: SORT_NAME };
}

// Sort products by discount
export const sortDiscount = () => {
  return { type: SORT_DISCOUNT };
}
