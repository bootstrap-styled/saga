import { connect } from 'react-redux';
import Toggle from '@bootstrap-styled/toggle/lib/components/Toggle';
import { createStructuredSelector } from 'reselect';
import { selectValue } from '@bootstrap-styled/redux/lib/selectors';
import { selectAsyncValues } from '../selectors';
import { changeThemeRequest as changeThemeRequestAction } from '../actions';

const mapStateToProps = createStructuredSelector({
  value: selectValue,
  values: selectAsyncValues,
});

export const mapDispatchToProps = (dispatch) => ({
  onToggle: (evt) => dispatch(changeThemeRequestAction(evt.target.value)),
});

/**
 * AsyncThemeToggle is used to display a select option to change async theme
 * @constructor
 */
export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
