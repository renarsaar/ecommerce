import {
  LOADING,
  ERROR,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true, products: [] };

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: []
      };

    case FETCH_PRODUCTS:
      return { ...state, loading: false, products: action.payload };

    // const newObject = action.payload.reduce(
    //   (map, item) => ({ ...map, [item.id]: item }),
    //   {}
    // );
    // return { ...state, ...newObject };

    case FETCH_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };

    // case DELETE_PRODUCT:
    //   return _.omit(state, action.payload);

    case CREATE_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
