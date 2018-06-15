const path = require('path');
const { config } = require('@yeutech/rollup-documentation/lib/styleguide.config.js');

module.exports = {
  ...config,
  require: [path.resolve(__dirname, 'styleguide/setup.js')],
};
