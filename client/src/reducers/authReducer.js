import {
  AUTH_LOADING,
  REGISTER_LOADING,
  VALIDATE_LOADING,
  LOG_IN,
  VALIDATE_USER,
  LOG_OUT,
  REGISTER_ACCOUNT,
  VALIDATE_ERROR,
  AUTH_ERROR,
  REGISTER_ERROR,
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
    case REGISTER_LOADING:
    case VALIDATE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_ACCOUNT:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LOG_IN:
    case VALIDATE_USER:
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

    case AUTH_ERROR:
    case REGISTER_ERROR:
    case VALIDATE_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
