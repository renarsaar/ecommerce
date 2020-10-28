import {
  SET_FILTER_APPARELTERM,
  SET_FILTER_BRANDTERM,
  RESET_FILTERS,
} from '../actions/types';

let filteredProducts;

function handleFiltering(apparelTerm, brandTerm, products) {
  if (apparelTerm && brandTerm) {
    filteredProducts = products.filter((product) => product.brand === brandTerm)
      .filter((product) => product.subCategory === apparelTerm);
  }

  if (apparelTerm && !brandTerm) {
    filteredProducts = products.filter((product) => product.subCategory === apparelTerm);
  }

  if (brandTerm && !apparelTerm) {
    filteredProducts = products.filter((product) => product.brand === brandTerm);
  }

  if (!brandTerm && !apparelTerm) {
    filteredProducts = undefined;
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_FILTER_APPARELTERM:
      handleFiltering(action.apparelTerm, state.brandTerm, action.products);

      return { ...state, apparelTerm: action.apparelTerm, filteredProducts };

    case SET_FILTER_BRANDTERM:
      handleFiltering(state.apparelTerm, action.brandTerm, action.products);

      return { ...state, brandTerm: action.brandTerm, filteredProducts };

    case RESET_FILTERS:
      return { state: [] };

    default:
      return state;
  }
};
