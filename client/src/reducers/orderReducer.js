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
} from '../actions/types';

const INITIAL_STATE = {
  ordersLoading: false,
  selectedOrder: null,
  terminals: null,
  // error: false,
  orders: null,
  next: null,
  previous: null,
  getOrdersError: null,
  getOrderError: null,
  getUserOrderError: null,
  createOrderError: null,
  getTerminalsError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_LOADING:
    case GET_ORDER_LOADING:
    case GET_USER_ORDERS_LOADING:
    case CREATE_ORDER_LOADING:
    case GET_TERMINALS_LOADING:
      return {
        ...state,
        ordersLoading: true,
        terminals: null,
        selectedOrder: null,
        getOrdersError: null,
        getOrderError: null,
        getUserOrderError: null,
        createOrderError: null,
        getTerminalsError: null,
      };

    case GET_ORDERS:
    case GET_USER_ORDERS:
      return {
        ...state,
        ordersLoading: false,
        orders: action.payload.paginatedResults,
        next: action.payload.next,
        previous: action.payload.previous,
        getOrderError: false,
        getUserOrderError: false,
      };

    case GET_ORDER:
      return {
        ...state,
        ordersLoading: false,
        selectedOrder: action.payload,
        getOrderError: false,
      };

    case CREATE_ORDER:
      return {
        ...state,
        ordersLoading: false,
        createOrderError: false,
      };

    case GET_TERMINALS:
      return {
        ...state,
        ordersLoading: false,
        terminals: action.payload,
        getTerminalsError: false,
      };

    case GET_ORDERS_ERROR:
      return {
        ...state,
        ordersLoading: false,
        orders: null,
        next: null,
        previous: null,
        getOrdersError: action.payload,
      };

    case GET_USER_ORDERS_ERROR:
      return {
        ...state,
        ordersLoading: false,
        orders: null,
        next: null,
        previous: null,
        getUserOrderError: action.payload,
      };

    case GET_ORDER_ERROR:
      return {
        ...state,
        ordersLoading: false,
        selectedOrder: null,
        getOrderError: action.payload,
      };

    case CREATE_ORDER_ERROR:
      return {
        ...state,
        ordersLoading: false,
        createOrderError: action.payload,
      };

    case GET_TERMINALS_ERROR:
      return {
        ...state,
        ordersLoading: false,
        terminals: null,
        getTerminalsError: action.payload,
      };

    default:
      return state;
  }
};
