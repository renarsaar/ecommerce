import {
  AUTH_LOADING,
  LOG_IN,
  GET_USER,
  VALIDATE_USER,
  LOG_OUT,
  REGISTER_ACCOUNT,
  VALIDATE_ERROR,
  LOG_IN_ERROR,
  GET_USER_ERROR,
  REGISTER_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  DELETE_ACCOUNT_ERROR,
  MAKE_ADMIN,
  MAKE_ADMIN_ERROR,
  BAN_USER,
  BAN_USER_ERROR,
  RECIEVE_PASSWORD_RESET_LINK,
  RECIEVE_PASSWORD_RESET_LINK_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  CLEAR_AUTH_REDUCER,
} from './types';
import api from '../api';
import history from '../history';

// Register a new user
export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.post('/auth/register', {
    name: values.name,
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: REGISTER_ACCOUNT });

        // Success, push to login page
        history.push('/account/login', { registerSuccess: true });
      }
    })
    .catch((error) => dispatch({ type: REGISTER_ERROR, payload: error.response.data }));
};

// Authenticate user & log in
export const logIn = (values) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.post('/auth/login', {
    email: values.email,
    password: values.password,
  })
    .then((response) => {
      dispatch({
        type: LOG_IN,
        token: response.data.token,
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          admin: response.data.admin,
          wishList: response.data.wishList,
        },
      });
      history.push({ pathname: '/' });
    })
    .catch((error) => dispatch({ type: LOG_IN_ERROR, payload: error.response.data }));
};

// Validate user on OAuth request when user already exists
export const validateOAuthUser = (values) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.patch('/auth/validation', {
    userId: values.userId,
    googleId: values.googleId,
    email: values.email,
    password: values.password,
  })
    .then((response) => {
      dispatch({
        type: VALIDATE_USER,
        token: response.data.token,
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          admin: response.data.admin,
          wishList: response.data.wishList,
        },
      });
      history.push({ pathname: '/' });
    })
    .catch((error) => dispatch({ type: VALIDATE_ERROR, payload: error.response.data }));
};

// Get all users
export const getUsers = (page, token) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.get('/auth/users', {
    params: {
      page,
      limit: 10,
    },
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => {
      dispatch({ type: GET_USERS, payload: response.data });
    })
    .catch((error) => dispatch({ type: GET_USERS_ERROR, payload: error.response.data }));
};

// Get the user & log in if jwt token in URL after OAuth login
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.get('/auth/user', {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => {
      dispatch({
        type: GET_USER,
        token,
        user: {
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          wishList: response.data.wishList,
          admin: response.data.isAdmin,
        },
      });
    })
    .catch((error) => dispatch({ type: GET_USER_ERROR, payload: error.response.data }));
};

// Receive reset password link
export const passwordResetLink = (email) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.post('/auth/reset/password', {
    email,
  })
    .then((response) => dispatch({
      type: RECIEVE_PASSWORD_RESET_LINK, payload: response.data,
    }))
    .catch((error) => dispatch({
      type: RECIEVE_PASSWORD_RESET_LINK_ERROR, payload: error.response.data,
    }));
};

// Reset user password
export const resetUserPassword = (token, userId, password, confirmPassword) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.patch(`/auth/resetpassword/${token}`, {
    userId,
    password,
    confirmPassword,
  })
    .then((response) => dispatch({ type: RESET_PASSWORD, payload: response.data }))
    .catch((error) => dispatch({ type: RESET_PASSWORD_ERROR, payload: error.response.data }));
};

// Change users password
export const changeUserPassword = (id, token, values) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.patch(`/auth/password/${id}`, {
    oldPassword: values.oldPassword,
    password: values.password,
    confirmPassword: values.confirmPassword,
  }, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: CHANGE_PASSWORD, payload: response.data }))
    .catch((error) => dispatch({ type: CHANGE_PASSWORD_ERROR, payload: error.response.data }));
};

// Give user admin status
export const makeAdminAction = (id, token) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.patch(`/auth/admin/${id}`, {}, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: MAKE_ADMIN, payload: response.data }))
    .catch((error) => dispatch({ type: MAKE_ADMIN_ERROR, payload: error.data }));
};

// Ban user
export const banUserAction = (id, token, banComment) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.patch(`/auth/ban/${id}`, {
    banComment,
  }, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then((response) => dispatch({ type: BAN_USER, payload: response.data }))
    .catch((error) => dispatch({ type: BAN_USER_ERROR, payload: error.data }));
};

// Delete account
export const deleteAccount = (id, token) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  api.delete(`/auth/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  })
    .then(() => {
      dispatch({ type: LOG_OUT });

      history.push({ pathname: '/' });
    })
    .catch((error) => dispatch({ type: DELETE_ACCOUNT_ERROR, payload: error.response.data }));
};

// Clear reducer back to initial state
export const clearAuthReducer = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_REDUCER });
};

// Log user out & push to /
export const logOut = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });

  history.push({ pathname: '/' });
};
