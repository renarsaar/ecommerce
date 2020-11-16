import { LOG_IN, LOG_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
      };

    default:
      return state;
  }
};
