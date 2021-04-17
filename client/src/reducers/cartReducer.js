import {
  ADD_CART,
  ADD_CART_ONE,
  REMOVE_CART,
  CLEAR_CART,
} from '../actions/types';

const INITIAL_STATE = JSON.parse(sessionStorage.getItem('cart')) || [];
let newState = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CART:
      newState = [...state];
      // If the product already exists in cart
      if (state.some((product) => product.key === action.product.key)) {
        // Find the index of the product
        const index = state.findIndex((product) => product.key === action.product.key);

        // Add quantity and price
        newState[index].quantity += action.product.quantity;
        newState[index].totalPrice += action.product.totalPrice;

        // If more products in cart than in stock
        if (state[index].quantity >= action.product.stock) {
          newState[index].quantity = action.product.stock;
          newState[index].totalPrice = action.product.productPrice * action.product.stock;
        }
      } else {
        newState = [...state, action.product];
      }

      sessionStorage.setItem('cart', JSON.stringify(newState));

      return newState;

    case ADD_CART_ONE:
      newState = [...state];

      // Add quantity & price
      newState[action.index].quantity += 1;
      newState[action.index].totalPrice += state[action.index].productPrice;

      if (state[action.index].quantity >= state[action.index].stock) {
        newState[action.index].quantity = state[action.index].stock;
        newState[action.index].totalPrice = state[action.index].productPrice * state[action.index].stock;
      }

      sessionStorage.setItem('cart', JSON.stringify(newState));

      return newState;

    case REMOVE_CART:
      newState = [...state];

      // Subtract quantity & price
      newState[action.index].quantity -= 1;
      newState[action.index].totalPrice -= state[action.index].productPrice;

      if (state[action.index].quantity === 0) {
        newState = [...state.filter((product, index) => index !== action.index)];
      }

      sessionStorage.setItem('cart', JSON.stringify(newState));

      return newState;

    case CLEAR_CART:
      newState = [];
      sessionStorage.removeItem('cart');

      return newState;

    default:
      return state;
  }
};
