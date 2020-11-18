import {
  SHOW_SHOP,
  SHOW_FABRIC,
  SHOW_JOURNAL,
  SHOW_ABOUT
} from './types';

export const showShop = () => ({ type: SHOW_SHOP });
export const showFabric = () => ({ type: SHOW_FABRIC });
export const showJournal = () => ({ type: SHOW_JOURNAL });
export const showAbout = () => ({ type: SHOW_ABOUT });