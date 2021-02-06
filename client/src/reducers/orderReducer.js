import {
  GET_ORDERS_LOADING,
  GET_ORDERS,
  GET_ORDERS_ERROR,
  GET_USER_ORDERS_LOADING,
  GET_USER_ORDERS,
  GET_USER_ORDERS_ERROR,
  CREATE_ORDER_LOADING,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_TERMINALS_LOADING,
  GET_TERMINALS,
  GET_TERMINALS_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  terminals: null,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_LOADING:
    case GET_USER_ORDERS_LOADING:
    case CREATE_ORDER_LOADING:
    case GET_TERMINALS_LOADING:
      return {
        loading: true,
        terminals: null,
        error: false,
      };

    case GET_ORDERS:
    case GET_USER_ORDERS:
      return {
        loading: false,
        orders: action.payload,
        error: false,
      };

    case CREATE_ORDER:
      return {
        loading: false,
        error: false,
      };

    case GET_TERMINALS:
      return {
        loading: false,
        terminals: action.payload,
        error: false,
      };

    case GET_ORDERS_ERROR:
    case GET_USER_ORDERS_ERROR:
    case CREATE_ORDER_ERROR:
    case GET_TERMINALS_ERROR:
      return {
        loading: false,
        terminals: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
