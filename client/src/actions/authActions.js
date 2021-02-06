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
} from './types';
import api from '../api';
import history from '../history';

// Register a new user
export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });

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
        history.push({ pathname: '/account/login', state: { registerSuccess: true } });
      }
    })
    .catch((error) => dispatch({ type: REGISTER_ERROR, payload: error.response.data }));
};

// Authenticate user & log in
export const logIn = (values) => async (dispatch) => {
  dispatch({ type: LOG_IN_LOADING });

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
          admin: response.data.isAdmin,
        },
      });
      history.push({ pathname: '/' });
    })
    .catch((error) => dispatch({ type: LOG_IN_ERROR, payload: error.response.data }));
};

// Validate user on OAuth request when user already exists
export const validateOAuthUser = (values) => async (dispatch) => {
  dispatch({ type: VALIDATE_LOADING });

  api.patch(`/auth/validation/${values.id}`, {
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
          admin: response.data.isAdmin,
        },
      });
      history.push({ pathname: '/' });
    })
    .catch((error) => dispatch({ type: VALIDATE_ERROR, payload: error.response.data }));
};

// Get the user & log in if jwt token in URL after OAuth login
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: GET_USER_LOADING });

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
          admin: response.data.isAdmin,
        },
      });
    })
    .catch((error) => dispatch({ type: GET_USER_ERROR, payload: error.response.data }));
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });

  history.push({ pathname: '/' });
};
