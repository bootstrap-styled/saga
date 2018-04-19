import bootstrapStyledTheme from 'bootstrap-styled/lib/theme';

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
  if (id !== bootstrapStyledTheme._name) {
    return themes[id]();
  }
  return bootstrapStyledTheme;
}
