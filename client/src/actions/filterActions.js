import { SET_FILTER_TERM, RESET_FILTERS } from './types';

export const setFilterTerm = (apparelTerm, brandTerm, searchTerm, products) => ({
  type: SET_FILTER_TERM,
  apparelTerm,
  brandTerm,
  searchTerm,
  products,
});

// Reset all filters
export const resetFilters = () => ({ type: RESET_FILTERS });
