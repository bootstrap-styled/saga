import { makeTheme } from 'bootstrap-styled';
import { changeThemeSuccess, changeThemeFailure } from '../actions';
import { CHANGE_THEME_SUCCESS, CHANGE_THEME_FAILURE } from '../constants';


describe('bootstrap-styled-saga actions', () => {
  let theme;
  beforeAll(() => {
    theme = makeTheme({
      '$brand-primary': 'red',
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
});
