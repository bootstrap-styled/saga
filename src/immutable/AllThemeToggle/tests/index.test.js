import React from 'react';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import reduxReducer from '@bootstrap-styled/redux/lib/immutable/reducer';
import theme, { makeTheme } from 'bootstrap-styled/lib/theme';
import { changeTheme as changeThemeAction } from '@bootstrap-styled/redux/lib/actions';
import sagaReducer from '../../reducer';
import { changeThemeRequest as changeThemeRequestAction } from '../../../actions';

import AsyncThemeToggle, { mapDispatchToProps, mergeProps } from '../index';
import { themes } from '../../../../styleguide/components/tests/themeProvider';

/* eslint-disable function-paren-newline, no-underscore-dangle */
describe('<AsyncThemeToggle />', () => {
  let store;
  let reducer;
  beforeAll(() => {
    reducer = combineReducers({
      'bs.redux': reduxReducer,
      'bs.saga': sagaReducer,
    });
    store = createStore(reducer, fromJS({
      'bs.redux': {
        theme,
        themes: {
          [`${theme._name}-pink-async`]: makeTheme({
            _name: `${theme._name}-pink-async`,
            '$btn-primary-bg': 'pink',
          }),
        },
      },
      'bs.saga': {
        themes,
      },
    }));
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
    describe('dispatch', () => {
      let dispatchProps;
      let dispatch;

      it('should be injected', () => {
        dispatch = jest.fn();
        dispatchProps = mapDispatchToProps(dispatch);
        expect(dispatchProps.dispatch).toBeDefined();
      });

      describe('mergeProps', () => {
        let stateProps;
        let mergedProps;

        beforeAll(() => {
          dispatch = jest.fn();
          stateProps = {
            asyncThemes: themes,
          };
        });

        it('should dispatch onToggle async when called', () => {
          dispatch = jest.fn();
          dispatchProps = mapDispatchToProps(dispatch);
          mergedProps = mergeProps(stateProps, dispatchProps);
          const evt = { target: { value: Object.keys(themes)[0] } };
          mergedProps.onToggle(evt);
          expect(dispatch).toHaveBeenCalledWith(changeThemeRequestAction(Object.keys(themes)[0]));
        });

        it('should dispatch onToggle sync when called', () => {
          dispatch = jest.fn();
          const newTheme = { ...theme, _name: 'edited', _async: true };
          dispatchProps = mapDispatchToProps(dispatch);
          mergedProps = mergeProps(stateProps, dispatchProps);
          const evt = { target: { value: newTheme._name } };
          mergedProps.onToggle(evt);
          expect(dispatch).toHaveBeenCalledWith(changeThemeAction(newTheme._name));
        });
      });
    });
  });
});
