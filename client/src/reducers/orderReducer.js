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
  ORDER_IS_SEEN_ACTION_LOADING,
  ORDER_IS_SEEN_ACTION,
  ORDER_IS_SEEN_ACTION_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  ordersLoading: false,
  orderIsSeenActionLoading: false,
  selectedOrder: null,
  terminals: null,
  orderIsSeenAction: false,
  orders: null,
  next: null,
  previous: null,
  getOrdersError: null,
  getOrderError: null,
  getUserOrderError: null,
  createOrderError: null,
  getTerminalsError: null,
  orderIsSeenActionError: false,
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

    case ORDER_IS_SEEN_ACTION_LOADING:
      return {
        ...state,
        orderIsSeenActionLoading: true,
        orderIsSeenAction: false,
        orderIsSeenActionError: false,
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

    case ORDER_IS_SEEN_ACTION:
      return {
        ...state,
        orderIsSeenActionLoading: false,
        orderIsSeenAction: true,
        orderIsSeenActionError: false,
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

    case ORDER_IS_SEEN_ACTION_ERROR:
      return {
        ...state,
        orderIsSeenActionLoading: false,
        orderIsSeenAction: false,
        orderIsSeenActionError: true,
      };

    default:
      return state;
  }
};
