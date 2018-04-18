import { all, call, put, takeLatest } from 'redux-saga/effects';
import { theme as bootstrapStyled } from 'bootstrap-styled';
import { CHANGE_THEME } from 'bootstrap-styled-redux/lib/constants';
import { changeThemeSuccess, changeThemeFailure } from '../actions';

import themeSaga, { makeLoadTheme } from '../saga';

const themes = {
  'bootstrap-styled': () => import('bootstrap-styled/lib/theme').then((theme) => theme.default),
};

function themeProvider(id) {
  return themes[id]();
}

/* eslint-disable redux-saga/yield-effects */
describe('bootstrapSaga Saga', () => {
  const loadTheme = makeLoadTheme(themeProvider);
  const bootstrapSaga = themeSaga(themeProvider)();

  it('should start task to watch for CHANGE_THEME action', () => {
    const takeLatestDescriptor = bootstrapSaga.next().value;
    expect(JSON.stringify(takeLatestDescriptor)).toEqual(JSON.stringify(all([takeLatest(CHANGE_THEME, loadTheme)])));
  });
});

describe('makeLoadTheme Saga', () => {
  let loadThemeGenerator;
  let current;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    current = bootstrapStyled._name; // eslint-disable-line no-underscore-dangle
    loadThemeGenerator = makeLoadTheme(themeProvider)({ current });

    const descriptor = loadThemeGenerator.next().value;
    expect(descriptor).toEqual(call(themeProvider, current));
  });

  it('should dispatch the changeThemeSuccess action if it requests the data successfully', () => {
    const putDescriptor = loadThemeGenerator.next(bootstrapStyled).value;
    expect(putDescriptor).toEqual(put(changeThemeSuccess(bootstrapStyled)));
  });

  it('should call the changeThemeFailure action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = loadThemeGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(changeThemeFailure(current, response)));
  });
});
