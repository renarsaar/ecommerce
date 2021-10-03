import {
  CONTACT_REQUEST_LOADING,
  CONTACT_REQUEST,
  CONTACT_REQUEST_ERROR,
  CLEAR_CONTACT_REDUCER,
} from '../actions/types';

const INITIAL_STATE = {
  contactLoading: false,
  contact: null,
  contactError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT_REQUEST_LOADING:
      return {
        ...state,
        contactLoading: true,
        contact: null,
        contactError: false,
      };

    case CONTACT_REQUEST:
      return {
        ...state,
        contactLoading: false,
        contact: action.payload,
        contactError: false,
      };

    case CONTACT_REQUEST_ERROR:
      return {
        ...state,
        contactLoading: false,
        contact: null,
        contactError: action.payload,
      };

    case CLEAR_CONTACT_REDUCER:
      return {
        ...state,
        contactLoading: false,
        contact: null,
        contactError: false,
      };

    default:
      return state;
  }
};
