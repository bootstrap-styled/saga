import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CHANGE_THEME } from 'bootstrap-styled-redux/lib/constants';
import { changeThemeSuccess, changeThemeFailure } from './actions';

export function makeLoadTheme(themeProvider) {
  return function* loadTheme(action) {
    try {
      const theme = yield call(themeProvider, action.current);
      yield put(changeThemeSuccess(theme));
    } catch (err) {
      yield put(changeThemeFailure(action.current, err));
    }
  };
}

export default (themeProvider) => function* bootstrapStyledSaga() {
  yield all([takeLatest(CHANGE_THEME, makeLoadTheme(themeProvider))]);
};
