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
          <style>
          /* http://meyerweb.com/eric/tools/css/reset/ 
             v2.0 | 20110126
             License: none (public domain)
          */
      
          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed, 
          figure, figcaption, footer, header, hgroup, 
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
          /* HTML5 display-role reset for older browsers */
          article, aside, details, figcaption, figure, 
          footer, header, hgroup, menu, nav, section {
            display: block;
          }
          body {
            line-height: 1;
          }
          ol, ul {
            list-style: none;
          }
          blockquote, q {
            quotes: none;
          }
          blockquote:before, blockquote:after,
          q:before, q:after {
            content: '';
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
          /* Pre loader css style */
          .panel {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          svg {
            width: 4em;
            height: 4em;  
            fill: #d8452b; 
            filter: drop-shadow(2px 2px 1px #cebebe);
          }
          </style>
          ${generateCSSReferences(css, publicPath)}
      </head>
      <body>
        <div id="rsg-root">
          <div class="panel"> 
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
              <g transform="rotate(-90 43 -17)">
                <circle cx="0" cy="0" r="8">
                  <animateTransform id="b" attributeName="transform" dur="0.2s" type="translate" values="0 0; 14 0; 0 0" begin="0;a.end"/>
                </circle>
              </g>
              <g transform="rotate(-30 124.962 -145.406)">
                <circle cx="0" cy="0" r="8">
                  <animateTransform id="c" attributeName="transform" dur="0.2s" type="translate" values="0 0; 14 0; 0 0" begin="b.end"/>
                </circle>
              </g>
              <g transform="rotate(30 -98.962 205.406)">
                <circle cx="0" cy="0" r="8">
                  <animateTransform id="d" attributeName="transform" dur="0.2s" type="translate" values="0 0; 14 0; 0 0" begin="c.end"/>
                </circle>
              </g>
              <g transform="rotate(90 -17 77)">
                <circle cx="0" cy="0" r="8">
                  <animateTransform id="e" attributeName="transform" dur="0.2s" type="translate" values="0 0; 14 0; 0 0" begin="d.end-0.02s"/>
                </circle>
              </g>
              <g transform="rotate(150 4.962 42.594)">
                <circle cx="0" cy="0" r="8">
                  <animateTransform id="f" attributeName="transform" dur="0.2s" type="translate" values="0 0; 14 0; 0 0" begin="e.end"/>
                </circle>
              </g>
              <g transform="rotate(-150 21.038 17.406)">
                <circle cx="0" cy="0" r="8">
                  <animateTransform id="a" attributeName="transform" dur="0.2s" type="translate" values="0 0; 14 0; 0 0" begin="f.end"/>
                </circle>
              </g>
            </svg>
          </div>
        </div>
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
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    const dir = path.dirname(componentPath);
    return `import ${name} from '${dir.replace(/^src\//, 'lib/')}';`;
  },
  ...config,
};
