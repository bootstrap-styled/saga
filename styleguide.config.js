const path = require('path');
const { config } = require('@yeutech-lab/rollup-umd-documentation/lib/styleguide.config.js');

module.exports = {
  ...config,
  require: [path.resolve(__dirname, 'styleguide/setup.js')],
};
