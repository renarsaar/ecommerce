import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cartReducer from './cartReducer';
import contactReducer from './contactReducer';
import filterReducer from './filterReducer';
import menuReducer from './menuReducer';
import ordersReducer from './orderReducer';
import productsReducer from './productsReducer';
import reviewReducer from './reviewReducer';
import sortReducer from './sortReducer';
import wishListReducer from './wishListReducer';

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  contact: contactReducer,
  filter: filterReducer,
  menu: menuReducer,
  orders: ordersReducer,
  products: productsReducer,
  reviews: reviewReducer,
  sort: sortReducer,
  wishList: wishListReducer,
});
