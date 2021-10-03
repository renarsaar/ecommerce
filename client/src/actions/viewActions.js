import { SWITCH_NAVIGATION, SWITCH_SORTING } from './types';

// Hide footer & headers
export const switchNavigation = (value) => (dispatch) => {
  dispatch({ type: SWITCH_NAVIGATION, hideNavigation: value });
};

// Hide Sort by select option from subheader
export const switchSorting = (value) => (dispatch) => {
  dispatch({ type: SWITCH_SORTING, hideSorting: value });
};
