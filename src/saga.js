import { all, call, put, takeLatest } from 'redux-saga/effects';
import { changeTheme } from '@bootstrap-styled/redux/lib/actions';
import { CHANGE_THEME_REQUEST } from './constants';
import { changeThemeFailure, storeAsyncTheme } from './actions';

/* eslint-disable no-underscore-dangle, no-param-reassign */
export function makeLoadTheme(themeProvider) {
  return function* loadTheme(action) {
    try {
      const theme = yield call(themeProvider, action.name);
      yield put(changeTheme({ ...theme, _async: true, _loaded: true }));
    } catch (err) {
      yield put(changeThemeFailure(action.name, err));
    }
  };
}

/**
 * This is the saga responsible of initializing the store for async themes
 * @param themeProvider
 * @param themes = either an object of named theme, or an array of names
 * clean: will erases themes stored in bootstrap-styled-redux.
 * persist: async theme will be left in stored when the theme a second times.
 */

export default (themeProvider, themes) => function* makeBootstrapStyledSaga() {
  // this will allow user to pass array of names or just the themes object
  const keys = themes instanceof Array ? themes : Object.keys(themes);

  // initialize our saga
  yield all([
    takeLatest(CHANGE_THEME_REQUEST, makeLoadTheme(themeProvider)),
  ].concat(keys.map((key) => put(storeAsyncTheme({ _name: key, _async: true, _loaded: false }))))); // this will store the keys
};
