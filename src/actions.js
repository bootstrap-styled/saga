import { CHANGE_THEME_SUCCESS, CHANGE_THEME_FAILURE } from './constants';

export const changeThemeSuccess = (theme) => ({
  type: CHANGE_THEME_SUCCESS,
  theme,
});

export const changeThemeFailure = (current, error) => ({
  type: CHANGE_THEME_FAILURE,
  error,
  current,
});
