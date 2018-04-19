We have made from the [Configuration](#configuration) a live demo.

```js
const { Provider } = require('react-redux');
const ConnectedBootstrapProvider = require('bootstrap-styled-redux/lib/components/ConnectedBootstrapProvider');
const { default: ThemeToggle } = require('bootstrap-styled-redux/lib/components/ThemeToggle');
const { createStore, applyMiddleware, compose } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { default: bootstrapStyledTheme, makeTheme } = require('bootstrap-styled/lib/theme');
const { default: Button } = require('bootstrap-styled/lib/Button');
const reducer = require('bootstrap-styled-redux/lib/reducer');
const { default: makeBootstrapStyledSaga } = require('bootstrap-styled-saga/lib/saga');

const themes = {
  'bootstrap-styled-red': () => Promise.resolve(makeTheme({
    _name: 'bootstrap-styled-red',
    '$btn-primary-bg': 'red',
  })),
  'bootstrap-styled-blue': () => Promise.resolve(makeTheme({
    _name: 'bootstrap-styled-blue',
    '$btn-primary-bg': 'blue',
  })),
};

const themeProvider = (id) => {
  if (id !== bootstrapStyledTheme._name) {
    console.log(themes[id])
    return themes[id];
  }
  return bootstrapStyledTheme;
};

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
      'toto': makeTheme({ _name: 'toto', '$btn-primary-bg': 'pink' }),
    }
  }
}, enhancer);
sagaMiddleware.run(bootstrapStyledSaga);

<Provider store={store}>
  <ConnectedBootstrapProvider>
    <ThemeToggle />
    <Button color="primary">I am just here so you can see me</Button>
  </ConnectedBootstrapProvider>
</Provider>
```
