Create a `themeProvider` as follow, we use promise so theme loading will be chunked if you use webpack, but it will also allow your to request theme online.

```js static
import bootstrapStyledTheme from 'bootstrap-styled/lib/theme';

/* eslint-disable no-underscore-dangle */
const themes = {
  'bootstrap-styled-red': () => import('bootstrap-styled/lib/theme').then((theme) => theme.makeTheme({
    _name: 'bootstrap-styled-red',
    '$btn-primary-bg': 'red',
  })),
  'bootstrap-styled-blue': () => import('bootstrap-styled/lib/theme').then((theme) => theme.makeTheme({
    _name: 'bootstrap-styled-blue',
    '$btn-primary-bg': 'blue',
  })),
};

/* eslint-disable no-underscore-dangle */
export default function themeProvider(id) {
  if (id !== bootstrapStyledTheme._name) {
    return themes[id]();
  }
  return bootstrapStyledTheme;
}

```

> See that we did not return a promised for the main theme we use so it can be bundled as an application requirement.

Start the the saga in your application, for exemple:

```js static
import React, { Component } from 'react';
import Provider from 'react-redux/lib/components/Provider';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ConnectedBootstrapProvider from 'bootstrap-styled-redux/lib/components/ConnectedBootstrapProvider';
import reducer from 'bootstrap-styled-redux/lib/reducer';
import makeBootstrapStyledSaga from 'bootstrap-styled-redux-saga/lib';

import themeProvider from './themeProvider';

const sagaMiddleware = createSagaMiddleware();
const bootstrapStyledSaga = makeBootstrapStyledSaga(themeProvider);

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

const store = createStore(reducer, enhancer);
sagaMiddleware.run(bootstrapStyledSaga);

function Wrapper(props) {
  return (
    <Provider store={store}>
      <ConnectedBootstrapProvider {...props} />
    </Provider>
  );
}
```
