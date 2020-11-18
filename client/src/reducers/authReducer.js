import {
  LOG_IN, LOG_OUT, AUTH_LOADING, ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  token: sessionStorage.getItem('token'),
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOG_IN:
      return {
        ...state,
        token: sessionStorage.setItem('token', action.token),
        isLoggedIn: true,
        user: action.user,
        loading: false,
        error: null,
      };

    case LOG_OUT:
      return {
        ...state,
        token: sessionStorage.removeItem('token'),
        isLoggedIn: false,
        user: null,
        loading: false,
        error: null,
      };

    case ERROR:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        user: null,
        error: action.payload,
      }

    default:
      return state;
  }
};
