import {
  REGISTER_LOADING,
  VALIDATE_LOADING,
  LOG_IN_LOADING,
  GET_USER_LOADING,
  LOG_IN,
  GET_USER,
  VALIDATE_USER,
  LOG_OUT,
  REGISTER_ACCOUNT,
  VALIDATE_ERROR,
  LOG_IN_ERROR,
  GET_USER_ERROR,
  REGISTER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  token: sessionStorage.getItem('token'),
  isLoggedIn: false,
  user: null,
  loading: false,
  logInError: null,
  getUserError: null,
  registerError: null,
  validateError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
    case VALIDATE_LOADING:
    case LOG_IN_LOADING:
    case GET_USER_LOADING:
      return {
        ...state,
        loading: true,
        logInError: null,
        registerError: null,
        validateError: null,
        getUserError: null,
      };

    case LOG_IN:
    case VALIDATE_USER:
    case GET_USER:
      return {
        ...state,
        token: sessionStorage.setItem('token', action.token),
        isLoggedIn: true,
        user: action.user,
        loading: false,
        logInError: null,
        registerError: null,
        validateError: null,
        getUserError: null,
      };

    case LOG_OUT:
      return {
        ...state,
        token: sessionStorage.removeItem('token'),
        isLoggedIn: false,
        user: null,
      };

    case REGISTER_ACCOUNT:
      return {
        ...state,
        loading: false,
        registerError: null,
        logInError: null,
      };

    case VALIDATE_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        validateError: action.payload,
      };

    case LOG_IN_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        logInError: action.payload,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        registerError: action.payload,
      };

    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        getUserError: action.payload,
      };

    default:
      return state;
  }
};
