import { fromJS } from 'immutable';
import { STORE_ASYNC_THEME, DELETE_ASYNC_THEMES } from '../../constants';

export const initialState = fromJS({
  themes: {},
});

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
      return state.setIn(['themes', action.theme._name], fromJS(action.theme));
    }
    case DELETE_ASYNC_THEMES: {
      return state.set('themes', fromJS({}));
    }
    default:
      return state;
  }
}
