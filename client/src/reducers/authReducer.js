import {
  REGISTER_LOADING,
  VALIDATE_LOADING,
  LOG_IN_LOADING,
  LOG_IN,
  VALIDATE_USER,
  LOG_OUT,
  REGISTER_ACCOUNT,
  VALIDATE_ERROR,
  LOG_IN_ERROR,
  REGISTER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  token: sessionStorage.getItem('token'),
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  logInError: null,
  registerError: null,
  authError: null,
  validateError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
    case VALIDATE_LOADING:
    case LOG_IN_LOADING:
      return {
        ...state,
        loading: true,
        logInError: null,
        registerError: null,
        validateError: null,
      };

    case LOG_IN:
    case VALIDATE_USER:
      return {
        ...state,
        token: sessionStorage.setItem('token', action.token),
        isLoggedIn: true,
        user: action.user,
        loading: false,
        logInError: null,
        validateError: null,
      };

    case LOG_OUT:
      return {
        ...state,
        token: sessionStorage.removeItem('token'),
        isLoggedIn: false,
        user: null,
        loading: false,
      };

    case REGISTER_ACCOUNT:
      return {
        ...state,
        loading: false,
        registerError: null,
      };

    case VALIDATE_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        user: null,
        validateError: action.payload,
      };

    case LOG_IN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        user: null,
        logInError: action.payload,
      }

    case REGISTER_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        user: null,
        registerError: action.payload,
      }

    default:
      return state;
  }
};
