import { STORE_ASYNC_THEME, DELETE_ASYNC_THEMES } from '../constants';

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
    case STORE_ASYNC_THEME: {
      return { themes: { ...state.themes, [action.theme._name]: action.theme } };
    }
    case DELETE_ASYNC_THEMES: {
      return { themes: {} };
    }
    default:
      return state;
  }
}
