// Product actions
export const LOADING = 'LOADING';
export const ERROR = 'MAKE_REQUEST';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const EDIT_PRODUCT_LOADING = 'EDIT_PRODUCT_LOADING';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR';
export const ADD_PRODUCT_LOADING = 'ADD_PRODUCT_LOADING';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';
export const CLEAR_PRODUCT_REDUCER = 'CLEAR_PRODUCT_REDUCER';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

// Order actions
export const ORDERS_LOADING = 'ORDERS_LOADING';
export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const GET_USER_ORDERS = 'GET_USER_ORDERS';
export const GET_USER_ORDERS_ERROR = 'GET_USER_ORDERS_ERROR';
export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const GET_TERMINALS = 'GET_TERMINALS';
export const GET_TERMINALS_ERROR = 'GET_TERMINALS_ERROR';
export const DELETE_ORDER_LOADING = 'DELETE_ORDER_LOADING';
export const DELETE_ORDER = 'DELETE_ORDER';
export const DELETE_ORDER_ERROR = 'DELETE_ORDER_ERROR';
export const CHANGE_ORDER_STATUS_LOADING = 'CHANGE_ORDER_STATUS_LOADING';
export const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';
export const CHANGE_ORDER_STATUS_ERROR = 'CHANGE_ORDER_STATUS_ERROR';

// Auth actions
export const AUTH_LOADING = 'AUTH_LOADING';
export const LOG_IN = 'LOG_IN';
export const GET_USER = 'GET_USER';
export const VALIDATE_USER = 'VALIDATE_USER';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';
export const VALIDATE_ERROR = 'VALIDATE_ERROR';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR';
export const MAKE_ADMIN = 'MAKE_ADMIN';
export const MAKE_ADMIN_ERROR = 'MAKE_ADMIN_ERROR';
export const BAN_USER = 'BAN_USER';
export const BAN_USER_ERROR = 'BAN_USER_ERROR';
export const CLEAR_AUTH_REDUCER = 'CLEAR_AUTH_REDUCER';

// Wishlist actions
export const ADD_WISHLIST_LS = 'ADD_WISHLIST_LS';
export const REMOVE_WISHLIST_LS = 'REMOVE_WISHLIST';
export const CLEAR_WISHLIST_LS = 'CLEAR_WISHLIST';
export const SET_WISHLIST_LS = 'SET_WISHLIST_LS';
export const SET_WISHLIST_DB = 'SET_WISHLIST_DB';
export const CHANGE_WISHLIST_DB = 'CHANGE_WISHLIST_DB';
export const CHANGE_WISHLIST_DB_ERROR = 'CHANGE_WISHLIST_DB_ERROR';
export const CLEAR_WISHLIST_REDUCER = 'CLEAR_WISHLIST_REDUCER';

// Cart actions
export const ADD_CART = 'ADD_CART';
export const ADD_CART_ONE = 'ADD_CART_ONE';
export const REMOVE_CART = 'REMOVE_CART';
export const CLEAR_CART = 'CLEAR_CART';

// Menu actions
export const SHOW_SHOP = 'SHOW_SHOP';
export const SHOW_FABRIC = 'SHOW_FABRIC';
export const SHOW_JOURNAL = 'SHOW_JOURNAL';
export const SHOW_ABOUT = 'SHOW_ABOUT';

// Sort actions
export const SORT_OLDEST = 'SORT_OLDEST';
export const SORT_NEWEST = 'SORT_NEWEST';
export const SORT_CHEAPEST = 'SORT_CHEAPEST';
export const SORT_EXPENSIVEST = 'SORT_EXPENSIVEST';
export const SORT_NAME = 'SORT_NAME';
export const SORT_DISCOUNT = 'SORT_DISCOUNT';

// Filter actions
export const SET_FILTER_APPARELTERM = 'FILTER_APPARELS';
export const SET_FILTER_BRANDTERM = 'FILTER_BRANDS';
export const RESET_FILTERS = 'RESET_FILTERS';

// Review actions
export const GET_REVIEWS_LOADING = 'GET_REVIEWS_LOADING';
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_REVIEWS_ERROR = 'GET_REVIEWS_ERROR';
export const POST_REVIEW_LOADING = 'POST_REVIEW_LOADING';
export const POST_REVIEW = 'POST_REVIEW';
export const POST_REVIEW_ERROR = 'POST_REVIEW_ERROR';
export const CLEAR_REVIEW_REDUCER = 'CLEAR_REVIEW_REDUCER';
