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
  GET_USERS_LOADING,
  GET_USERS,
  GET_USERS_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  DELETE_ACCOUNT_LOADING,
  DELETE_ACCOUNT_ERROR,
  MAKE_ADMIN_LOADING,
  MAKE_ADMIN,
  MAKE_ADMIN_ERROR,
  BAN_USER_LOADING,
  BAN_USER,
  BAN_USER_ERROR,
  CLEAR_AUTH_REDUCER,
} from '../actions/types';

const INITIAL_STATE = {
  token: sessionStorage.getItem('token'),
  isLoggedIn: false,
  user: null,
  users: null,
  nextUsers: null,
  previousUsers: null,
  changePassword: null,
  authLoading: false,
  makeAdmin: null,
  banUser: null,
  logInError: null,
  getUserError: null,
  registerError: null,
  validateError: null,
  changePasswordError: null,
  deleteAccountError: null,
  getUsersError: null,
  makeAdminError: null,
  banUserError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
    case VALIDATE_LOADING:
    case LOG_IN_LOADING:
    case GET_USER_LOADING:
    case CHANGE_PASSWORD_LOADING:
    case DELETE_ACCOUNT_LOADING:
    case GET_USERS_LOADING:
    case MAKE_ADMIN_LOADING:
    case BAN_USER_LOADING:
      return {
        ...state,
        authLoading: true,
        logInError: null,
        registerError: null,
        validateError: null,
        getUserError: null,
        changePasswordError: null,
        deleteAccountError: null,
        getUsersError: null,
        makeAdminError: null,
        banUserError: null,
      };

    case LOG_IN:
    case VALIDATE_USER:
    case GET_USER:
      return {
        ...state,
        token: sessionStorage.setItem('token', action.token),
        isLoggedIn: true,
        user: action.user,
        authLoading: false,
        logInError: null,
        registerError: null,
        validateError: null,
        getUserError: null,
      };

    case GET_USERS:
      return {
        ...state,
        authLoading: false,
        users: action.payload.paginatedResults,
        getUsersError: null,
        nextUsers: action.payload.next,
        previousUsers: action.payload.previous,
      };

    case LOG_OUT:
      return {
        ...state,
        token: sessionStorage.removeItem('token'),
        isLoggedIn: false,
        authLoading: false,
        user: null,
        users: null,
        nextUsers: null,
        previousUsers: null,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        authLoading: false,
        changePasswordError: null,
        changePassword: action.payload,
      };

    case REGISTER_ACCOUNT:
      return {
        ...state,
        authLoading: false,
        registerError: null,
        logInError: null,
      };

    case MAKE_ADMIN:
      return {
        ...state,
        authLoading: false,
        makeAdmin: action.payload,
        banUser: null,
        makeAdminError: null,
        banUserError: null,
      };

    case BAN_USER:
      return {
        ...state,
        authLoading: false,
        banUser: action.payload,
        makeAdmin: null,
        banUserError: null,
        makeAdminError: null,
      }

    case CLEAR_AUTH_REDUCER:
      return {
        ...state,
        authLoading: false,
        banUser: null,
        makeAdmin: null,
        banUserError: null,
        makeAdminError: null,
      };

    case VALIDATE_ERROR:
      return {
        ...state,
        authLoading: false,
        user: null,
        validateError: action.payload,
      };

    case LOG_IN_ERROR:
      return {
        ...state,
        authLoading: false,
        user: null,
        logInError: action.payload,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        authLoading: false,
        user: null,
        registerError: action.payload,
      };

    case GET_USER_ERROR:
      return {
        ...state,
        authLoading: false,
        user: null,
        getUserError: action.payload,
      };

    case GET_USERS_ERROR:
      return {
        ...state,
        authLoading: false,
        users: null,
        nextUsers: null,
        previousUsers: null,
        getUsersError: action.payload,
      };

    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        authLoading: false,
        changePassword: null,
        changePasswordError: action.payload,
      };

    case DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        authLoading: false,
        deleteAccountError: action.payload,
      };

    case MAKE_ADMIN_ERROR:
      return {
        ...state,
        authLoading: false,
        makeAdmin: null,
        makeAdminError: action.payload,
      }

    case BAN_USER_ERROR:
      return {
        ...state,
        authLoading: false,
        banUser: null,
        banUserError: action.payload,
      };

    default:
      return state;
  }
};
