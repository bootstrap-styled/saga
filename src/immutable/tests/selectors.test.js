import { fromJS } from 'immutable';
import theme from 'bootstrap-styled/lib/theme';
import { initialState } from '../reducer';
import {
  selectBsSaga, selectAsyncThemes, selectAsyncValues, selectGroupedThemes, selectGroupedValues,
} from '../selectors';

describe('selectBsSaga immutable', () => {
  let state;
  let bsSagaState;

  beforeEach(() => {
    bsSagaState = initialState;
    state = fromJS({
      'bs.saga': bsSagaState,
    });
  });

  describe('selectBsSaga', () => {
    it('should select the bootstrap-styled-saga state', () => {
      expect(selectBsSaga(state)).toEqual(state.get('bs.saga'));
    });

    describe('selectAsyncThemes', () => {
      it('should select the async themes', () => {
        expect(selectAsyncThemes(state)).toEqual(bsSagaState.get('themes'));
      });
    });

    describe('selectAsyncValues', () => {
      it('should select the async themes values', () => {
        expect(selectAsyncValues(state)).toEqual(bsSagaState.get('themes').keySeq().toArray());
      });
    });
  });

  describe('selectBsRedux and selectBsSaga', () => {
    it('should select sync and async themes', () => {
      expect(selectBsSaga(state)).toEqual(state.get('bs.saga'));
    });

    describe('selectGroupedThemes', () => {
      const doubleState = fromJS({
        'bs.redux': {
          theme,
          themes: {
            [theme._name]: theme, // eslint-disable-line no-underscore-dangle
          },
        },
        'bs.saga': {
          themes: {
            copy: theme,
          },
        },
      });
      it('should select the async themes', () => {
        expect(selectGroupedThemes(doubleState)).toEqual(fromJS({
          [theme._name]: theme, // eslint-disable-line no-underscore-dangle
          copy: theme,
        }));
      });
    });

    describe('selectGroupedValues', () => {
      const doubleState = fromJS({
        'bs.redux': {
          theme,
          themes: {
            [theme._name]: theme, // eslint-disable-line no-underscore-dangle
          },
        },
        'bs.saga': {
          themes: {
            copy: theme,
          },
        },
      });
      it('should select the grouped values', () => {
        expect(selectGroupedValues(doubleState)).toEqual(['copy', new String(theme._name)]); // eslint-disable-line no-underscore-dangle, no-new-wrappers
      });
    });
  });
});
