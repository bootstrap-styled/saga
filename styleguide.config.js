const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const config = require('./styleguide/styleguide.config.json');
const { generateCSSReferences, generateJSReferences } = MiniHtmlWebpackPlugin;

module.exports = {
  styleguideDir: 'public',
  previewDelay: 500,
  skipComponentsWithoutExample: false,
  showCode: false,
  showUsage: true,
  showSidebar: true,
  styles: {},
  template: ({
    css,
    js,
    title,
    publicPath,
  }) => `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        ${generateCSSReferences(css, publicPath)}
      </head>
      <body>
        <div id="app"></div>
        ${generateJSReferences(js, publicPath)}
      </body>
    </html>`,
  theme: {},
  title: `${pkg.description || pkg.name} documentation`,
  verbose: false,
  webpackConfig: {
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: [
          'node_modules/**/*.js',
        ],
      }),
    ],
    resolve: {
      alias: {
        'bootstrap-styled-saga': path.resolve(__dirname),
      },
    },
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'styleguide'),
          ],
          loader: 'babel-loader',
        },
      ],
    },
  },
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/LayoutRenderer'),
    Wrapper: path.join(__dirname, 'styleguide/components/Wrapper'),
  },
  ...config,
};
