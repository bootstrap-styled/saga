/* eslint-disable no-underscore-dangle */
export const themes = {
  'bootstrap-styled-red-async': () => import('bootstrap-styled/lib/theme').then((theme) => theme.makeTheme({
    _name: 'bootstrap-styled-red-async',
    '$btn-primary-bg': 'red',
  })),
  'bootstrap-styled-blue-async': () => import('bootstrap-styled/lib/theme').then((theme) => theme.makeTheme({
    _name: 'bootstrap-styled-blue-async',
    '$btn-primary-bg': 'blue',
  })),
};

/* eslint-disable no-underscore-dangle */
export default function themeProvider(id) {
  return themes[id]();
}
