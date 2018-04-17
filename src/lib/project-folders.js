const path = require ('path');
const { rootPath } = require('get-root-path');
const { uiFolder, distFolder } = require('../lib/config-loader');
const {
  nodeEnv,
  EXAMPLE_PROJECT_FOLDER,
  CONFIG_FILE_NAME
} = require('../helpers/constants');

module.exports.ui = (process.env.NODE_ENV === nodeEnv.dev)
  ? path.join(__dirname, '../..', EXAMPLE_PROJECT_FOLDER, uiFolder)
  : path.join(rootPath, uiFolder);

module.exports.assets = (process.env.NODE_ENV === nodeEnv.dev)
  ? path.join(__dirname, '../../', EXAMPLE_PROJECT_FOLDER, distFolder)
  : path.join(rootPath, distFolder);
