import {
  SHOW_SHOP,
  SHOW_FABRIC,
  SHOW_JOURNAL,
  SHOW_ABOUT,
} from '../actions/types';

const INITIAL_STATE = {
  shop: true,
  fabric: false,
  journal: false,
  about: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_SHOP:
      return {
        ...state,
        shop: true,
        fabric: false,
        journal: false,
        about: false
      };

    case SHOW_FABRIC:
      return {
        ...state,
        shop: false,
        fabric: true,
        journal: false,
        about: false
      };

    case SHOW_JOURNAL:
      return {
        ...state,
        shop: false,
        fabric: false,
        journal: true,
        about: false
      };

    case SHOW_ABOUT:
      return {
        ...state,
        shop: false,
        fabric: false,
        journal: false,
        about: true
      };

    default:
      return state;
  }
}