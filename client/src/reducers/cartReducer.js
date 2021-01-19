import {
  ADD_CART,
  ADD_CART_ONE,
  REMOVE_CART,
  CLEAR_CART,
} from '../actions/types';

const INITIAL_STATE = JSON.parse(sessionStorage.getItem('cart')) || [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CART:
      // If the product already exists in cart
      if (state.some((product) => product.key === action.product.key)) {
        // Find the index of the product
        const index = state.findIndex((product) => product.key === action.product.key);

        // Add quantity and price
        state[index].quantity += action.product.quantity;
        state[index].totalPrice += action.product.totalPrice;

        // If more products in cart than in stock
        if (state[index].quantity >= action.product.stock) {
          state[index].quantity = action.product.stock;
          state[index].totalPrice = action.product.productPrice * action.product.stock;
        }
      } else {
        state = [...state, action.product];
      }

      sessionStorage.setItem('cart', JSON.stringify(state));

      return JSON.parse(sessionStorage.getItem('cart'));

    case ADD_CART_ONE:
      // Add quantity & price
      state[action.index].quantity += 1;
      state[action.index].totalPrice += state[action.index].productPrice;

      if (state[action.index].quantity >= state[action.index].stock) {
        state[action.index].quantity = state[action.index].stock;
        state[action.index].totalPrice = state[action.index].productPrice * state[action.index].stock;
      }

      sessionStorage.setItem('cart', JSON.stringify(state));

      return JSON.parse(sessionStorage.getItem('cart'));

    case REMOVE_CART:
      // Subtract quantity & price
      state[action.index].quantity -= 1;
      state[action.index].totalPrice -= state[action.index].productPrice;

      if (state[action.index].quantity === 0) {
        state = [...state.filter((product, index) => index !== action.index)];
      }

      sessionStorage.setItem('cart', JSON.stringify(state));

      return JSON.parse(sessionStorage.getItem('cart'));

    case CLEAR_CART:
      state = [];
      sessionStorage.removeItem('cart');

      return state;

    default:
      return state;
  }
};
