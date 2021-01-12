import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_TERMINALS_LOADING,
  GET_TERMINALS,
  GET_TERMINALS_ERROR,
} from './types';
import api from '../api';

// Create a new order
export const createOrder = (values) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_LOADING });

  api.post('/orders', {

  })
    .then((response) => dispatch({ type: CREATE_ORDER, payload: response.data }))
    .catch((error) => dispatch({ type: CREATE_ORDER_ERROR, payload: { error } }));
};

// Get Itella parcel terminal locations
export const fetchParcelTerminals = () => async (dispatch) => {
  dispatch({ type: GET_TERMINALS_LOADING });

  api.get('/orders/omniva')
    .then((response) => dispatch({ type: GET_TERMINALS, payload: response.data }))
    .catch((error) => dispatch({ type: GET_TERMINALS_ERROR, payload: error.message }));
};
