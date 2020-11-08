import {
  ADD_CART,
  REMOVE_CART,
  CLEAR_CART,
} from '../actions/types';

export default (state = [], action) => {
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

        return [...state];
      }

      return [...state, action.product];

    case REMOVE_CART:
      // Subtract quantity & price
      state[action.index].quantity -= 1;
      state[action.index].totalPrice -= action.productPrice;

      if (state[action.index].quantity === 0) {
        return [...state.filter((product, index) => index !== action.index)];
      }

      return [...state];

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};
