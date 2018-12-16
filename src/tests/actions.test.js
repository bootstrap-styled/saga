import { makeTheme } from 'bootstrap-styled';
import {
  changeThemeRequest, changeThemeFailure, deleteAsyncThemes, storeAsyncTheme,
} from '../actions';
import {
  CHANGE_THEME_REQUEST, CHANGE_THEME_FAILURE, DELETE_ASYNC_THEMES, STORE_ASYNC_THEME,
} from '../constants';


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

  describe('storeAsyncTheme', () => {
    it('should dispatch storeAsyncTheme', () => {
      expect(storeAsyncTheme(theme)).toEqual({
        type: STORE_ASYNC_THEME,
        theme,
      });
    });
  });
});
