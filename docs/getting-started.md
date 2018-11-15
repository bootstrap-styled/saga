### themeProvider

It is a file where you export a theme provider function and an object of `themes` functions that return a promise.

It is the perfect place to store any logic regarding theme loading création and edition after async call. 
 
We use promise so the loading will done by chunk in configured webpack project.

You can for example create a `themeProvider` to provide the location of your asynchronous `themes`.

```js static
/* eslint-disable no-underscore-dangle */
export const themes = {
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
  return themes[id]();
}

```
 
We do not recommended to use an asynchronous main theme for your site because it will slightly slow down your application boot time.

This is why we do not initialize the main theme that way, it will only be used when `CHANGE_THEME` is happening on `AsyncThemeToggle` (for example).

Use `@bootstrap-styled/redux` to configure your main theme. 

> This example is just a demo and does not make sens in real life as the promise it return contain a local theme. You should use it to query with fetch or xhr for example.

> Notice that we did not return a promised for the main theme we use so it can be bundled as an application requirement.
