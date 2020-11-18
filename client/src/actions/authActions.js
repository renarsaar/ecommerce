import {
  AUTH_LOADING,
  LOG_IN,
  LOG_OUT,
  ERROR,
} from './types';
import api from '../api';
import history from '../history';

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
    .catch((error) => dispatch({ type: ERROR, payload: error.response.data }));
};

export const logOut = () => ({});
