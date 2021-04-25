import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import menuReducer from './menuReducer';
import ordersReducer from './orderReducer';
import sortReducer from './sortReducer';
import filterReducer from './filterReducer';
import wishListReducer from './wishListReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  products: productsReducer,
  menu: menuReducer,
  orders: ordersReducer,
  sort: sortReducer,
  filter: filterReducer,
  wishList: wishListReducer,
  cart: cartReducer,
  auth: authReducer,
  reviews: reviewReducer,
  contact: contactReducer,
});
