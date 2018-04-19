import { all, call, put, takeLatest } from 'redux-saga/effects';
import { theme as bootstrapStyled } from 'bootstrap-styled';
import { storeTheme } from 'bootstrap-styled-redux/lib/actions';

import { CHANGE_THEME_REQUEST } from '../constants';
import { changeThemeSuccess, changeThemeFailure } from '../actions';

import themeSaga, { makeLoadTheme } from '../saga';
import themeProvider, { themes } from '../../styleguide/components/tests/i18nProvider';

/* eslint-disable redux-saga/yield-effects */
describe('bootstrapSaga Saga', () => {
  const loadTheme = makeLoadTheme(themeProvider);
  const bootstrapSaga = themeSaga(themeProvider, themes)();

  it('should start task to watch for CHANGE_THEME action', () => {
    const takeLatestDescriptor = bootstrapSaga.next().value;
    expect(JSON.stringify(takeLatestDescriptor)).toEqual(JSON.stringify(all([
      takeLatest(CHANGE_THEME_REQUEST, makeLoadTheme(themeProvider)),
    ].concat(undefined)
      .concat(Object.keys(themes).map((key) => put(storeTheme({ _name: key, _async: true, _loaded: false })))))));
  });
});
//
// describe('makeLoadTheme Saga', () => {
//   let loadThemeGenerator;
//   let current;
//
//   // We have to test twice, once for a successful load and once for an unsuccessful one
//   // so we do all the stuff that happens beforehand automatically in the beforeEach
//   beforeEach(() => {
//     current = bootstrapStyled._name; // eslint-disable-line no-underscore-dangle
//     loadThemeGenerator = makeLoadTheme(themeProvider)({ current });
//
//     const descriptor = loadThemeGenerator.next().value;
//     expect(descriptor).toEqual(call(themeProvider, current));
//   });
//
//   it('should dispatch the changeThemeSuccess action if it requests the data successfully', () => {
//     const putDescriptor = loadThemeGenerator.next(bootstrapStyled).value;
//     expect(putDescriptor).toEqual(put(changeThemeSuccess(bootstrapStyled)));
//   });
//
//   it('should call the changeThemeFailure action if the response errors', () => {
//     const response = new Error('Some error');
//     const putDescriptor = loadThemeGenerator.throw(response).value;
//     expect(putDescriptor).toEqual(put(changeThemeFailure(current, response)));
//   });
// });
