import { SWITCH_NAVIGATION, SWITCH_SORTING } from '../actions/types';

const INITIAL_STATE = {
  hideNavigation: false,
  hideSorting: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_NAVIGATION:
      return {
        ...state,
        hideNavigation: action.hideNavigation,
      };

    case SWITCH_SORTING:
      return {
        ...state,
        hideSorting: action.hideSorting,
      };

    default:
      return state;
  }
};
