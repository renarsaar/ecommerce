import {
  ORDERS_LOADING,
  GET_ORDERS,
  GET_ORDERS_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_USER_ORDERS,
  GET_USER_ORDERS_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_TERMINALS,
  GET_TERMINALS_ERROR,
  CHANGE_ORDER_STATUS_LOADING,
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER_STATUS_ERROR,
  DELETE_ORDER_LOADING,
  DELETE_ORDER,
  DELETE_ORDER_ERROR,
} from './types';
import api from '../api';
import history from '../history';

//TODO: Orders on Admin page are not paginated
// Get all orders
export const getOrders = (page, token) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });

  api.get('/orders', {
    headers: {
      'x-auth-token': token,
    },
  }, {
    params: {
      page,
      limit: 10,
    },
  })
    .then((response) => dispatch({ type: GET_ORDERS, payload: response.data, orderType: 'All' }))
    .catch((error) => dispatch({ type: GET_ORDERS_ERROR, payload: { error } }));
};

// Get all new orders
export const getNewOrders = (page, token) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });

  api.get('/orders', {
    headers: {
      'x-auth-token': token,
    },
    params: {
      page,
      new: true,
      limit: 10,
    },
  })
    .then((response) => dispatch({ type: GET_ORDERS, payload: response.data, orderType: 'New' }))
    .catch((error) => dispatch({ type: GET_ORDERS_ERROR, payload: { error } }));
};

// Get single order
export const getOrder = (id, token) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });

  api.get(`/orders/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: GET_ORDER, payload: response.data }))
    .catch((error) => dispatch({ type: GET_ORDER_ERROR, payload: { error } }));
};

// Get all order made from one User
export const getUserOrders = (userId, page, token) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });

  api.get(`/orders/user/${userId}`, {
    headers: {
      'x-auth-token': token,
    },
  }, {
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
  dispatch({ type: ORDERS_LOADING });

  const reqBody = {
    name: values.name,
    email: values.email,
    products: values.products,
    totalPrice: values.totalPrice,
    delivery: values.delivery,
  };

  if (values.userId) reqBody.userId = values.userId;

  api.post('/orders', reqBody)
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

// Delete order by Id
export const deleteOrder = (orderId, token) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_LOADING });

  api.delete(`/orders/delete/${orderId}`, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: DELETE_ORDER, payload: response.data.messsage }))
    .catch((error) => dispatch({ type: DELETE_ORDER_ERROR, payload: error.message }));
};

// Change order status
export const changeOrderStatus = (newStatus, orderId, token, statusComment) => async (dispatch) => {
  dispatch({ type: CHANGE_ORDER_STATUS_LOADING });

  api.patch(`/orders/status/${orderId}`, {
    newStatus,
    statusComment,
  }, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: CHANGE_ORDER_STATUS, payload: response.data }))
    .catch((error) => dispatch({ type: CHANGE_ORDER_STATUS_ERROR, payload: error.data }));
};

// Get Omniva parcel terminal locations
export const fetchParcelTerminals = () => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });

  api.get('/parcels')
    .then((response) => dispatch({ type: GET_TERMINALS, payload: response.data }))
    .catch((error) => dispatch({ type: GET_TERMINALS_ERROR, payload: error.message }));
};
