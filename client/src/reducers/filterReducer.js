import { SET_FILTER_TERM, RESET_FILTERS } from '../actions/types';

// Filter all products
function handleFiltering(apparelTerm, brandTerm, searchTerm, products) {
  let newFilteredProducts = products;

  if (apparelTerm)
    newFilteredProducts = newFilteredProducts.filter((product) => product.subCategory === apparelTerm);

  if (brandTerm)
    newFilteredProducts = newFilteredProducts.filter((product) => product.brand === brandTerm);

  if (searchTerm) {
    newFilteredProducts = newFilteredProducts
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (!brandTerm && !apparelTerm && !searchTerm)
    newFilteredProducts = null;

  return newFilteredProducts;
}

const INITIAL_STATE = {
  apparelTerm: '',
  brandTerm: '',
  searchTerm: '',
  filteredProducts: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTER_TERM:
      const {
        apparelTerm,
        brandTerm,
        searchTerm,
        products,
      } = action;

      return {
        apparelTerm,
        brandTerm,
        searchTerm,
        filteredProducts: handleFiltering(apparelTerm, brandTerm, searchTerm, products),
      };

    case RESET_FILTERS:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
