import {
  SORT_OLDEST,
  SORT_NEWEST,
  SORT_CHEAPEST,
  SORT_EXPENSIVEST,
  SORT_NAME,
  SORT_DISCOUNT,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SORT_OLDEST:
      return {
        ...state,
        sortValue: SORT_OLDEST,
      };

    case SORT_NEWEST:
      return {
        ...state,
        sortValue: SORT_NEWEST,
      };

    case SORT_CHEAPEST:
      return {
        ...state,
        sortValue: SORT_CHEAPEST,
      };

    case SORT_EXPENSIVEST:
      return {
        ...state,
        sortValue: SORT_EXPENSIVEST,
      };

    case SORT_NAME:
      return {
        ...state,
        sortValue: SORT_NAME,
      };

    case SORT_DISCOUNT:
      return {
        ...state,
        sortValue: SORT_DISCOUNT,
      };

    default:
      return state;
  }
};
