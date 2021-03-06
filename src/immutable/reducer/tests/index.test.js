import { fromJS } from 'immutable';
import asyncThemeReducer, { initialState } from '../index';
import {
  deleteAsyncThemes as deleteAsyncThemesAction,
  storeAsyncTheme as storeAsyncThemeAction,
} from '../../../actions';

describe('asyncThemeReducer immutable', () => {
  let state;
  let expectedResult;

  beforeEach(() => {
    state = initialState;
    expectedResult = undefined;
  });

  it('should return the initial state', () => {
    expectedResult = state;
    expect(asyncThemeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the deleteAsyncThemes action correctly', () => {
    expectedResult = fromJS({
      themes: {},
    });
    expect(asyncThemeReducer(state, deleteAsyncThemesAction())).toEqual(expectedResult);
  });

  it('should handle the storeAsyncTheme action correctly', () => {
    const theme = {
      _name: 'test',
      $white: '#eee',
    };
    expectedResult = fromJS({
      themes: {
        [theme._name]: theme, // eslint-disable-line no-underscore-dangle
      },
    });
    expect(asyncThemeReducer(state, storeAsyncThemeAction(theme))).toEqual(expectedResult);
  });
});
