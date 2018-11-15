Start the the saga in your application, for example:

```js static
import React, { Component } from 'react';
import Provider from 'react-redux/lib/components/Provider';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ConnectedBootstrapProvider from '@bootstrap-styled/redux/lib/components/ConnectedBootstrapProvider';
import bsReduxSaga from '@bootstrap-styled/saga/lib/saga';

// use the combinedReducers if you don't have any from your app
import combinedReducers from '@bootstrap-styled/redux/lib/reducer'; 

 // or import our asyncThemeReducer and combine it your self
// import asyncThemeReducer from '@bootstrap-styled/redux/lib/asyncThemeReducer';

// you provide this
import themeProvider, { theme } from './themeProvider';

const sagaMiddleware = createSagaMiddleware();
const bootstrapStyledSaga = bsReduxSaga(themeProvider, themes);

// inject the saga middleware (this is redux-saga basic configuration)
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

const store = createStore(combinedReducers, enhancer);
sagaMiddleware.run(bootstrapStyledSaga);

function Wrapper(props) {
  return (
    <Provider store={store}>
      <ConnectedBootstrapProvider {...props} />
    </Provider>
  );
}
```

The most important part is this : 

```js static
import themeProvider, { theme } from './themeProvider';

const sagaMiddleware = createSagaMiddleware();
const bootstrapStyledSaga = bsReduxSaga(themeProvider, themes);
```

It will provide your `themeProvider` and your availables values to our module.

`themes` can be an array of `value` used as identifier, or a `themes` object.
