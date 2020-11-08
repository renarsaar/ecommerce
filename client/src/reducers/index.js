import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import menuReducer from './menuReducer';
import sortReducer from './sortReducer';
import filterReducer from './filterReducer';
import wishListReducer from './wishListReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

export default combineReducers({
  products: productsReducer,
  menu: menuReducer,
  sort: sortReducer,
  filter: filterReducer,
  wishList: wishListReducer,
  cart: cartReducer,
  auth: authReducer,
});
