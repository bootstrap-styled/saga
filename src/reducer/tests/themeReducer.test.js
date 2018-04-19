import asyncThemeReducer, { initialState } from '../asyncThemeReducer';
import { changeThemeSuccess as changeThemeSuccessAction } from '../../actions';

describe('asyncThemeReducer', () => {
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

  it('should handle the storeTheme action correctly', () => {
    const theme = {
      _name: 'test',
      $white: '#eee',
    };
    expectedResult = {
      themes: {
        [theme._name]: theme, // eslint-disable-line no-underscore-dangle
      },
    };
    expect(asyncThemeReducer(state, changeThemeSuccessAction(theme))).toEqual(expectedResult);
  });
});
