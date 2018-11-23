import React, { Component } from 'react';
import Provider from 'react-redux/lib/components/Provider';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ConnectedBootstrapProvider from '@bootstrap-styled/redux/lib/ConnectedBootstrapProvider';
import createSagaMiddleware from 'redux-saga';
import bootstrapStyledTheme, { makeTheme } from 'bootstrap-styled/lib/theme';
import bsReduxReducer from '@bootstrap-styled/redux/lib/reducer';
import bsSagaReducer from '../../src/reducer';
import makeBootstrapStyledSaga from '../../src/saga';
import themeProvider, { themes } from './tests/themeProvider';

const reducer = combineReducers({
  'bs.redux': bsReduxReducer,
  'bs.saga': bsSagaReducer,
});

export default class Wrapper extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    store: null,
  }

  /* eslint-disable no-underscore-dangle, function-paren-newline */
  componentWillMount() {
    const sagaMiddleware = createSagaMiddleware();
    const bootstrapStyledSaga = makeBootstrapStyledSaga(themeProvider, themes);
    const middleware = [
      sagaMiddleware,
    ];
    const composeEnhancers =
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;


    const enhancer = composeEnhancers(applyMiddleware(...middleware),
      // other store enhancers if any
    );

    const store = createStore(reducer, {
      'bs.redux': {
        theme: bootstrapStyledTheme,
        themes: {
          [bootstrapStyledTheme._name]: bootstrapStyledTheme,
          [`${bootstrapStyledTheme._name}-pink-sync`]: makeTheme({ _name: `${bootstrapStyledTheme._name}-pink-sync`, '$btn-primary-bg': 'pink' }),
        },
      },
    }, enhancer);
    sagaMiddleware.run(bootstrapStyledSaga);

    this.setState({
      store,
    });
  }
  /* eslint-enable no-underscore-dangle, function-paren-newline */

  render() {
    return (
      <Provider store={this.state.store}>
        <ConnectedBootstrapProvider injectGlobal={false}>
          {this.props.children}
        </ConnectedBootstrapProvider>
      </Provider>
    );
  }
}

