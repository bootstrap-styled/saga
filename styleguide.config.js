const path = require('path');
const { config } = require('rollup-documentation/lib/styleguide.config.js');

module.exports = {
  ...config,
  require: [path.resolve(__dirname, 'styleguide/setup.js')],
};
