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
  about: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_SHOP:
      return {
        shop: true,
        fabric: false,
        journal: false,
        about: false,
      };

    case SHOW_FABRIC:
      return {
        shop: false,
        fabric: true,
        journal: false,
        about: false,
      };

    case SHOW_JOURNAL:
      return {
        shop: false,
        fabric: false,
        journal: true,
        about: false,
      };

    case SHOW_ABOUT:
      return {
        shop: false,
        fabric: false,
        journal: false,
        about: true,
      };

    default:
      return state;
  }
};
