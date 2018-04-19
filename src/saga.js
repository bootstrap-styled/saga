import { all, select, call, put, takeLatest } from 'redux-saga/effects';
import { changeTheme, storeTheme, deleteThemes } from 'bootstrap-styled-redux/lib/actions';
import { selectAsyncThemes } from './selectors';
import { CHANGE_THEME_REQUEST } from './constants';
import { changeThemeFailure } from './actions';

/** demo options to be passed to that saga */
const defaults = { clean: false, unload: true };

/* eslint-disable no-underscore-dangle, no-param-reassign */
export function makeLoadTheme(themeProvider, options = defaults) {
  return function* loadTheme(action) {
    try {
      const theme = yield call(themeProvider, action.theme);
      if (options.unload) {
        const themes = yield select(selectAsyncThemes);
        const unloadList = Object.keys(themes)
          .map((key) => themes[key]._async && themes[key]._loaded ? put(storeTheme({ _name: key, _async: true, _loaded: false })) : null) // eslint-disable-line
          .filter((i) => !!i);
        yield all(unloadList);
      }
      yield put(changeTheme({ ...theme, _async: true, _loaded: true }));
    } catch (err) {
      yield put(changeThemeFailure(action.theme, err));
    }
  };
}

/**
 * This is the saga responsible of initializing the store for async themes
 * @param themeProvider
 * @param themes = either an object of named theme, or an array of names
 * @param options = { clean: false, persist: true }
 * clean: will erases themes stored in bootstrap-styled-redux.
 * persist: async theme will be left in stored when the theme a second times.
 */

export default (themeProvider, themes, options) => function* makeBootstrapStyledSaga() {
  // this will allow user to pass array of names or just the themes object
  let keys = themes instanceof Array ? themes : Object.keys(themes);

  // if our keys are any of the defaults options, then our keys are in really options
  if (keys.some((r) => Object.keys(defaults).indexOf(r) >= 0)) {
    options = keys;
    keys = [];
  } else {
    options = defaults;
  }

  // initialize our saga
  yield all([
    takeLatest(CHANGE_THEME_REQUEST, makeLoadTheme(themeProvider, options)),
  ].concat(options.clean ? put(deleteThemes()) : undefined)
    .concat(keys.map((key) => put(storeTheme({ _name: key, _async: true, _loaded: false }))))); // this will store the keys
};
