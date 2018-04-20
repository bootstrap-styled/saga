import { CHANGE_THEME_REQUEST, CHANGE_THEME_FAILURE, DELETE_ASYNC_THEMES, STORE_ASYNC_THEME } from './constants';

/**
 * trigger to use change async theme
 * @param name
 */
export const changeThemeRequest = (name) => ({
  type: CHANGE_THEME_REQUEST,
  name,
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
 * store async theme in store
 */
export const storeAsyncTheme = (theme) => ({
  type: STORE_ASYNC_THEME,
  theme,
});

/**
 * delete all async themes in store
 */
export const deleteAsyncThemes = () => ({
  type: DELETE_ASYNC_THEMES,
});
