import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import theme from 'bootstrap-styled/lib/theme';
import { changeTheme as changeThemeAction } from 'bootstrap-styled-redux/lib/actions';
import reducer from '../../../reducer';
import { changeThemeRequest as changeThemeRequestAction } from '../../../actions';

import AsyncThemeToggle, { mapDispatchToProps } from '../index';

/* eslint-disable function-paren-newline, no-underscore-dangle */
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
        const evt = { target: { value: theme._name } };
        result.onToggle(evt);
        expect(dispatch).toHaveBeenCalledWith(changeThemeAction(theme._name));
      });

      it('should dispatch onToggle async when called', () => {
        const dispatch = jest.fn();
        const newTheme = { ...theme, _name: 'edited', _async: true };
        const result = mapDispatchToProps(dispatch, {
          asyncThemes: {
            [newTheme._name]: newTheme,
          },
        });
        const evt = { target: { value: newTheme._name } };
        result.onToggle(evt);
        expect(dispatch).toHaveBeenCalledWith(changeThemeRequestAction(newTheme));
      });
    });
  });
});
