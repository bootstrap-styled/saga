import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import theme from 'bootstrap-styled/lib/theme';
import bsReduxReducer from '@bootstrap-styled/redux/lib/reducer';
import { changeThemeRequest as changeThemeRequestAction } from '../../actions';
import sagaReducer from '../../reducer';
import AsyncThemeToggle, { mapDispatchToProps } from '..';

/* eslint-disable function-paren-newline */
describe('<AsyncThemeToggle />', () => {
  let store;
  let reducer;
  beforeAll(() => {
    reducer = combineReducers({
      'bs.saga': sagaReducer,
      'bs.redux': bsReduxReducer,
    });
    store = createStore(reducer);
  });

  it('should render the default language messages', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <AsyncThemeToggle />
      </Provider>
    );
    expect(renderedComponent.contains(<AsyncThemeToggle />)).toBe(true);
  });

  describe('mapDispatchToProps', () => {
    describe('onToggle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onToggle).toBeDefined();
      });

      it('should dispatch onToggle when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const evt = { target: { value: theme } };
        result.onToggle(evt);
        expect(dispatch).toHaveBeenCalledWith(changeThemeRequestAction(theme));
      });
    });
  });
});
