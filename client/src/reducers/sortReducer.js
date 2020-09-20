import {
  SORT_OLDEST,
  SORT_NEWEST,
  SORT_CHEAPEST,
  SORT_EXPENSIVEST,
  SORT_NAME,
  SORT_DISCOUNT,
} from '../actions/types';

const INITIAL_STATE = {
  oldest: true,
  newest: null,
  cheapest: null,
  expensivest: null,
  name: null,
  discount: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SORT_OLDEST:
      return {
        oldest: true,
        newest: false,
        cheapest: false,
        expensivest: false,
        name: false,
        discount: false,
      };

    case SORT_NEWEST:
      return {
        oldest: false,
        newest: true,
        cheapest: false,
        expensivest: false,
        name: false,
        discount: false,
      };


    case SORT_CHEAPEST:
      return {
        oldest: false,
        newest: false,
        cheapest: true,
        expensivest: false,
        name: false,
        discount: false,
      };

    case SORT_EXPENSIVEST:
      return {
        oldest: false,
        newest: false,
        cheapest: false,
        expensivest: true,
        name: false,
        discount: false,
      };

    case SORT_NAME:
      return {
        oldest: false,
        newest: false,
        cheapest: false,
        expensivest: false,
        name: true,
        discount: false,
      };

    case SORT_DISCOUNT:
      return {
        oldest: false,
        newest: false,
        cheapest: false,
        expensivest: false,
        name: false,
        discount: true,
      };

    default:
      return state;
  }
}