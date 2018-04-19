import { CHANGE_THEME_REQUEST, CHANGE_THEME_SUCCESS, CHANGE_THEME_FAILURE, DELETE_ASYNC_THEMES } from './constants';

/**
 * trigger to use change async theme
 * @param name
 */
export const changeThemeRequest = (name) => ({
  type: CHANGE_THEME_REQUEST,
  name,
});

/**
 * changeTheme success
 * @param theme
 */
export const changeThemeSuccess = (theme) => ({
  type: CHANGE_THEME_SUCCESS,
  theme,
});

/**
 * changeTheme failure
 * @param current
 * @param error
 */
export const changeThemeFailure = (current, error) => ({
  type: CHANGE_THEME_FAILURE,
  error,
  current,
});

/**
 * delete all async themes in store
 */
export const deleteAsyncThemes = () => ({
  type: DELETE_ASYNC_THEMES,
});
