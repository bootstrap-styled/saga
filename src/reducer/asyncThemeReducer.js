import { CHANGE_THEME_SUCCESS } from '../constants';

export const initialState = {
  themes: {},
};

/* eslint-disable no-underscore-dangle */
/**
 * asyncThemeReducer
 * @param state
 * @param action
 * @returns {*}
 */
export default function asyncThemeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME_SUCCESS: {
      return { themes: { ...state.themes, [action.theme._name]: action.theme } };
    }
    default:
      return state;
  }
}
