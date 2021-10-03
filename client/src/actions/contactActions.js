import {
  CONTACT_REQUEST_LOADING,
  CONTACT_REQUEST,
  CONTACT_REQUEST_ERROR,
  CLEAR_CONTACT_REDUCER,
} from './types';
import api from '../api';

// Submit a contact form
export const contactRequest = (values) => async (dispatch) => {
  dispatch({ type: CONTACT_REQUEST_LOADING });

  api.post('/contact', {
    name: values.contactName,
    email: values.contactEmail,
    message: values.contactMessage,
  })
    .then((response) => dispatch({ type: CONTACT_REQUEST, payload: response.data }))
    .catch((error) => dispatch({ type: CONTACT_REQUEST_ERROR, payload: error.response.data }));
};

export const clearContactReducer = () => (dispatch) => {
  dispatch({ type: CLEAR_CONTACT_REDUCER });
};
