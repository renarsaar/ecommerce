import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_TERMINALS_LOADING,
  GET_TERMINALS,
  GET_TERMINALS_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  makeOrder: null,
  terminals: null,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ORDER_LOADING:
    case GET_TERMINALS_LOADING:
      return {
        loading: true,
        makeOrder: null,
        terminals: null,
        error: false,
      };

    case CREATE_ORDER:
      return {
        loading: false,
        makeOrder: action.payload,
        error: false,
      };

    case GET_TERMINALS:
      return {
        loading: false,
        terminals: action.payload,
        error: false,
      };

    case CREATE_ORDER_ERROR:
    case GET_TERMINALS_ERROR:
      return {
        loading: false,
        makeOrder: false,
        terminals: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
