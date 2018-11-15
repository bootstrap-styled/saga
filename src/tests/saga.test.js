import { all, call, put, takeLatest } from 'redux-saga/effects';
import { theme as bootstrapStyled } from 'bootstrap-styled';
import { changeTheme as changeThemeAction } from '@bootstrap-styled/redux/lib/actions';
import { CHANGE_THEME_REQUEST } from '../constants';
import { changeThemeFailure, storeAsyncTheme } from '../actions';

import themeSaga, { makeLoadTheme } from '../saga';
import themeProvider, { themes } from '../../styleguide/components/tests/themeProvider';

/* eslint-disable redux-saga/yield-effects */
describe('bootstrapSaga Saga', () => {
  let bootstrapSaga;

  it('should start task to watch for CHANGE_THEME_REQUEST action using keys as themes', () => {
    bootstrapSaga = themeSaga(themeProvider, Object.keys(themes))();

    const takeLatestDescriptor = bootstrapSaga.next().value;
    expect(JSON.stringify(takeLatestDescriptor)).toEqual(JSON.stringify(all([
      takeLatest(CHANGE_THEME_REQUEST, makeLoadTheme(themeProvider)),
    ].concat(Object.keys(themes).map((key) => put(storeAsyncTheme({ _name: key, _async: true, _loaded: false })))))));
  });

  it('should start task to watch for CHANGE_THEME_REQUEST action using themes object', () => {
    bootstrapSaga = themeSaga(themeProvider, themes)();

    const takeLatestDescriptor = bootstrapSaga.next().value;
    expect(JSON.stringify(takeLatestDescriptor)).toEqual(JSON.stringify(all([
      takeLatest(CHANGE_THEME_REQUEST, makeLoadTheme(themeProvider)),
    ].concat(Object.keys(themes).map((key) => put(storeAsyncTheme({ _name: key, _async: true, _loaded: false })))))));
  });
});

describe('makeLoadTheme Saga', () => {
  let loadThemeGenerator;
  let name;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that HAPPENS beforehand automatically in the beforeEach
  beforeEach(() => {
    name = bootstrapStyled._name; // eslint-disable-line no-underscore-dangle
    loadThemeGenerator = makeLoadTheme(themeProvider)({ name });
    const descriptor = loadThemeGenerator.next().value;
    expect(descriptor).toEqual(call(themeProvider, name));
  });

  it('should dispatch the changeTheme action if it requests the data successfully', () => {
    const putDescriptor = loadThemeGenerator.next(bootstrapStyled).value;
    expect(putDescriptor).toEqual(put(changeThemeAction({ ...bootstrapStyled, _async: true, _loaded: true })));
  });

  it('should call the changeThemeFailure action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = loadThemeGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(changeThemeFailure(name, response)));
  });
});
