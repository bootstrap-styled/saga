import { makeTheme } from 'bootstrap-styled';
import { changeThemeRequest, changeThemeSuccess, changeThemeFailure, deleteAsyncThemes } from '../actions';
import { CHANGE_THEME_REQUEST, CHANGE_THEME_SUCCESS, CHANGE_THEME_FAILURE, DELETE_ASYNC_THEMES } from '../constants';


describe('bootstrap-styled-saga actions', () => {
  let theme;
  beforeAll(() => {
    theme = makeTheme({
      '$brand-primary': 'red',
    });
  });

  describe('changeThemeRequest', () => {
    it('should dispatch changeThemeRequest', () => {
      expect(changeThemeRequest('someid')).toEqual({
        type: CHANGE_THEME_REQUEST,
        name: 'someid',
      });
    });
  });

  describe('changeThemeSuccess', () => {
    it('should dispatch changeThemeSuccess', () => {
      expect(changeThemeSuccess(theme)).toEqual({
        type: CHANGE_THEME_SUCCESS,
        theme,
      });
    });
  });

  describe('changeThemeFailure', () => {
    it('should dispatch changeThemeFailure', () => {
      const error = new Error('failure');
      expect(changeThemeFailure(theme._name, error)).toEqual({ // eslint-disable-line no-underscore-dangle
        type: CHANGE_THEME_FAILURE,
        error,
        current: theme._name, // eslint-disable-line no-underscore-dangle
      });
    });
  });

  describe('deleteAsyncThemes', () => {
    it('should dispatch deleteAsyncThemes', () => {
      expect(deleteAsyncThemes()).toEqual({
        type: DELETE_ASYNC_THEMES,
      });
    });
  });
});
