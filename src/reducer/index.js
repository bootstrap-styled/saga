import { combineReducers } from 'redux';
import themeReducer from 'bootstrap-styled-redux/lib/reducer/themeReducer';
import asyncThemeReducer from './asyncThemeReducer';

const bsSagaReducer = combineReducers({
  'bs.redux': themeReducer,
  'bs.saga': asyncThemeReducer,
});

export default bsSagaReducer;
