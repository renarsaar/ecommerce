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
        sortedProducts: action.products.sort(
          (previous, current) => new Date(previous.date) - new Date(current.date),
        ),
      };

    case SORT_NEWEST:
      return {
        ...state,
        sortValue: SORT_NEWEST,
        sortedProducts: action.products.sort(
          (previous, current) => new Date(current.date) - new Date(previous.date),
        ),
      };

    case SORT_CHEAPEST:
      return {
        ...state,
        sortValue: 'SORT_CHEAPEST',
        sortedProducts: action.products.sort(
          (previous, current) => previous.discountPrice - current.discountPrice,
        ),
      };

    case SORT_EXPENSIVEST:
      return {
        ...state,
        sortValue: 'SORT_EXPENSIVEST',
        sortedProducts: action.products.sort(
          (previous, current) => current.discountPrice - previous.discountPrice,
        ),
      };

    case SORT_NAME:
      return {
        ...state,
        sortValue: 'SORT_NAME',
        sortedProducts: action.products.sort(
          (previous, current) => previous.name.localeCompare(current.name),
        ),
      };

    case SORT_DISCOUNT:
      return {
        ...state,
        sortValue: 'SORT_DISCOUNT',
        sortedProducts: action.products.sort((previous, current) => {
          const currentDiscount = current.price - current.discountPrice;
          const previousDiscount = previous.price - previous.discountPrice;

          return currentDiscount - previousDiscount;
        }),
      };

    default:
      return state;
  }
};
