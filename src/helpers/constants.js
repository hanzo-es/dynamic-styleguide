const { join } = require('path');

exports.folders = {
  public      : join(__dirname, '../..', 'public'),
  src         : join(__dirname, '..', ),
  lib         : join(__dirname, '..', 'lib'),
  views       : join(__dirname, '..', 'views'),
  controllers : join(__dirname, '..', 'controllers'),
  routes      : join(__dirname, '..', 'routes'),
  assets      : join(__dirname, '..', 'assets')
};

exports.nodeEnv = {
  dev: 'development',
  prod: 'production'
};

exports.EXAMPLE_PROJECT_FOLDER = 'example-project';
exports.CONFIG_FILE_NAME = 'styleguide.config.json';
exports.README_FILE_NAME = 'readme.md';
exports.EXAMPLE_FILE_NAME = 'example.txt'