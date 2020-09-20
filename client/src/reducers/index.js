import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import menuReducer from './menuReducer';
import sortReducer from './sortReducer';

export default combineReducers({
  products: productsReducer,
  menu: menuReducer,
  sort: sortReducer,
});
