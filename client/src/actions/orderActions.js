import {
  GET_ORDERS_LOADING,
  GET_ORDERS,
  GET_ORDERS_ERROR,
  GET_ORDER_LOADING,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_USER_ORDERS_LOADING,
  GET_USER_ORDERS,
  GET_USER_ORDERS_ERROR,
  CREATE_ORDER_LOADING,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_TERMINALS_LOADING,
  GET_TERMINALS,
  GET_TERMINALS_ERROR,
} from './types';
import api from '../api';
import history from '../history';

// Get all orders
export const getOrders = (page) => async (dispatch) => {
  dispatch({ type: GET_ORDERS_LOADING });

  api.get('/orders', {
    params: {
      page,
      limit: 10,
    },
  })
    .then((response) => dispatch({ type: GET_ORDERS, payload: response.data }))
    .catch((error) => dispatch({ type: GET_ORDERS_ERROR, payload: { error } }));
};

// Get single order
export const getOrder = (id, token) => async (dispatch) => {
  dispatch({ type: GET_ORDER_LOADING });

  api.get(`/orders/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: GET_ORDER, payload: response.data }))
    .catch((error) => dispatch({ type: GET_ORDER_ERROR, payload: { error } }));
};

// Get all order made from one User
export const getUserOrders = (userName, page) => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_LOADING });

  api.get(`/orders/user/${userName}`, {
    params: {
      page,
      limit: 6,
    },
  })
    .then((response) => dispatch({ type: GET_USER_ORDERS, payload: response.data }))
    .catch((error) => dispatch({ type: GET_USER_ORDERS_ERROR, payload: { error } }));
};

// Create a new order
export const createOrder = (values) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_LOADING });

  api.post('/orders', {
    user: values.user,
    email: values.email,
    products: values.products,
    totalPrice: values.totalPrice,
    delivery: values.delivery,
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: CREATE_ORDER });

        history.push('/cart/success');
      }
    })
    .catch((error) => dispatch({
      type: CREATE_ORDER_ERROR,
      payload: error.message,
    }));
};

// Change order status to seen by admin
export const orderIsSeen = (id) => async () => {
  api.patch(`/orders/isSeen/${id}`);
};

// Get Omniva parcel terminal locations
export const fetchParcelTerminals = () => async (dispatch) => {
  dispatch({ type: GET_TERMINALS_LOADING });

  api.get('/orders/omniva')
    .then((response) => dispatch({ type: GET_TERMINALS, payload: response.data }))
    .catch((error) => dispatch({ type: GET_TERMINALS_ERROR, payload: error.message }));
};
