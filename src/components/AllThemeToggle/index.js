import { connect } from 'react-redux';
import Toggle from 'bootstrap-styled-toggle/lib/components/Toggle';
import { createStructuredSelector } from 'reselect';
import { changeTheme as changeThemeAction } from 'bootstrap-styled-redux/lib/actions';
import { selectValue } from 'bootstrap-styled-redux/lib/selectors';
import { selectGroupedValues, selectAsyncThemes } from '../../selectors';
import { changeThemeRequest as changeThemeRequestAction } from '../../actions';

const mapStateToProps = createStructuredSelector({
  /** we pick the actual value from bootstrap-styled-redux */
  value: selectValue,
  /** we use a special selector that group values of both store */
  values: selectGroupedValues,
  /** we need to map the async themes here otherwise we cannot filter and know which key come from the async store. */
  asyncThemes: selectAsyncThemes,
});

export const mapDispatchToProps = (dispatch) => ({ dispatch });

/* eslint-disable no-underscore-dangle, no-plusplus, no-cond-assign */
export const mergeProps = ({ asyncThemes, ...stateProps }, { dispatch, ...dispatchProps }) => ({
  ...stateProps,
  ...dispatchProps,
  onToggle: (evt) => {
    let asyncKey = false;
    let key;
    const keys = Object.keys(asyncThemes);
    while (key = keys.shift()) {
      if (key === evt.target.value) {
        asyncKey = true;
        break;
      }
    }
    return dispatch(asyncKey ? changeThemeRequestAction(evt.target.value) : changeThemeAction(evt.target.value));
  },
});

/**
 * AllThemeToggle will display sync and unsync theme
 * @constructor
 */
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Toggle);
