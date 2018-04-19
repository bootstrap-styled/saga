import { createSelector } from 'reselect';

export const selectBsSaga = (state) => state['bs.saga'];

/**
 * themes
 */
export const selectAsyncThemes = createSelector(
  selectBsSaga,
  (bsSagaState) => bsSagaState.themes,
);

/**
 * async theme values
 */
export const selectAsyncValues = createSelector(
  selectBsSaga,
  (bsSagaState) => Object.keys(bsSagaState.themes),
);

/**
 * async all themes
 */
export const selectGroupedThemes = createSelector(
  (state) => ({ sagaState: state['bs.saga'], reduxState: state['bs.redux'] }),
  (tmpState) => ({ ...tmpState.reduxState.themes, ...tmpState.sagaState.themes }),
);


/**
 * async all theme values
 */
export const selectGroupedValues = createSelector(
  (state) => ({ sagaState: state['bs.saga'], reduxState: state['bs.redux'] }),
  (tmpState) => Object.keys(tmpState.sagaState.themes).concat(Object.keys(tmpState.reduxState.themes)),
);
