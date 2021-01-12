import {
  SET_FILTER_APPARELTERM,
  SET_FILTER_BRANDTERM,
  RESET_FILTERS,
} from './types';

// Filter products by category
export const setFilterApparelTerm = (apparelTerm, products) => ({
  type: SET_FILTER_APPARELTERM,
  apparelTerm,
  products,
});

// Filter products by brand
export const setFilterBrandTerm = (brandTerm, products) => ({
  type: SET_FILTER_BRANDTERM,
  brandTerm,
  products,
});

// Reset all filters
export const resetFilters = () => ({ type: RESET_FILTERS });
