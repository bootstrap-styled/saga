import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'bootstrap-styled-toggle/lib/components/Toggle';
import { createStructuredSelector } from 'reselect';
import { changeTheme as changeThemeAction } from 'bootstrap-styled-redux/lib/actions';
import { selectValue } from 'bootstrap-styled-redux/lib/selectors';
import { selectAsyncValues } from '../../selectors';

/**
 * AsyncThemeToggle is used to display a select option to change async theme
 * @constructor
 */
export const AsyncThemeToggle = (props) => <Toggle {...props} />;

const mapStateToProps = createStructuredSelector({
  value: selectValue,
  values: selectAsyncValues,
});

export const mapDispatchToProps = (dispatch) => ({
  onToggle: (evt) => dispatch(changeThemeAction(evt.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AsyncThemeToggle);
