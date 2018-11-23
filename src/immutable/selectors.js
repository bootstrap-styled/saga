import { createSelector } from 'reselect';
export const selectBsSaga = (state) => state.get('bs.saga');

/**
 * themes
 */
export const selectAsyncThemes = createSelector(
  selectBsSaga,
  (bsSagaState) => bsSagaState.get('themes'),
);

/**
 * async theme values
 */
export const selectAsyncValues = createSelector(
  selectBsSaga,
  (bsSagaState) => bsSagaState.get('themes').keySeq().toArray(),
);

/**
 * async all themes
 */
export const selectGroupedThemes = (state) => state.getIn(['bs.saga', 'themes']).mergeDeep(state.getIn(['bs.redux', 'themes']));

/**
 * async all theme values
 */
export const selectGroupedValues = createSelector(
  selectGroupedThemes,
  (groupedThemes) => groupedThemes.keySeq().toArray(),
);
