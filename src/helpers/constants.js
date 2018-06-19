const { join } = require('path');

/* eslint-disable key-spacing */
exports.folders = {
  public      : join(__dirname, '../..', 'public'),
  src         : join(__dirname, '..'),
  lib         : join(__dirname, '..', 'lib'),
  views       : join(__dirname, '..', 'views'),
  controllers : join(__dirname, '..', 'controllers'),
  routes      : join(__dirname, '..', 'routes'),
  assets      : join(__dirname, '..', 'assets')
};
/* eslint-enable key-spacing */

exports.nodeEnv = {
  dev: 'development',
  prod: 'production',
  test: 'test'
};

exports.EXAMPLE_PROJECT_FOLDER = 'example-project';
exports.CONFIG_FILE_NAME = 'styleguide.config.json';
exports.README_FILE_NAME = 'readme.md';
exports.EXAMPLE_FILE_NAME = 'example.txt';
// Ignore the folders here defined by the script that go through the folder
// structure to generate the side menu
exports.DS_IGNORED_FOLDERS = ['assets'];
exports.DEFAULT_ELEMENTS_URL_DIRECTORY = 'view';
exports.DEFAULT_PAGES_URL_DIRECTORY = 'pages';
exports.allowedArgs = {
  customConfigFile: 'configFile'
};
