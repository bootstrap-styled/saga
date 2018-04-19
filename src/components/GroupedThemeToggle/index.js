import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'bootstrap-styled-toggle/lib/components/Toggle';
import { createStructuredSelector } from 'reselect';
import { changeTheme as changeThemeAction } from 'bootstrap-styled-redux/lib/actions';
import { selectValue, selectValues } from 'bootstrap-styled-redux/lib/selectors';
import { selectGroupedValues, selectAsyncThemes } from '../../selectors';
import { changeThemeRequest as changeThemeRequestAction } from '../../actions';

/**
 * GroupedThemeToggle is used to display a select option to change async theme
 * @constructor
 */
export const GroupedThemeToggle = ({ syncValues, asyncThemes, ...props }) => <Toggle {...props} />; // eslint-disable-line react/prop-types


const mapStateToProps = createStructuredSelector({
  value: selectValue,
  values: selectGroupedValues,
  syncValues: selectValues,
  asyncThemes: selectAsyncThemes, // we need to map the async themes here otherwise we cannot know if the key used is an async one.
});

export const mapDispatchToProps = (dispatch, { asyncThemes } = { asyncThemes: {} }) => ({
  // eslint-disable-next-line no-underscore-dangle
  onToggle: (evt) => {
    let asyncTheme;
    Object.keys(asyncThemes).forEach((key) => {
      if (key === evt.target.value && asyncThemes[key]._async) { // eslint-disable-line no-underscore-dangle
        asyncTheme = asyncThemes[key];
      }
    });
    // one action take a value, t
    return asyncTheme ? dispatch(changeThemeRequestAction(asyncTheme)) : dispatch(changeThemeAction(evt.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupedThemeToggle);
