import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import theme from 'bootstrap-styled/lib/theme';
import { changeThemeRequest as changeThemeRequestAction } from '../../../actions';
import reducer from '../../../reducer';
import AsyncThemeToggle, { mapDispatchToProps } from '../index';

/* eslint-disable function-paren-newline */
describe('<AsyncThemeToggle />', () => {
  let store;
  beforeAll(() => {
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
