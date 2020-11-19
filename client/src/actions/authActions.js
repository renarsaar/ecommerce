import {
  AUTH_LOADING,
  REGISTER_LOADING,
  LOG_IN,
  LOG_OUT,
  REGISTER_ACCOUNT,
  AUTH_ERROR,
  REGISTER_ERROR,
} from './types';
import api from '../api';
import history from '../history';

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
        },
      });
      history.push({ pathname: '/' });
    })
    .catch((error) => dispatch({ type: AUTH_ERROR, payload: error.response.data }));
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });

  history.push({ pathname: '/' });
};
