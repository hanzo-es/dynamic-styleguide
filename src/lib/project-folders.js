const path = require('path');
const rootPath = require('../lib/root-path');
const {
  uiFolder,
  assets,
  pages
} = require('../lib/config-loader');

const {
  nodeEnv,
  EXAMPLE_PROJECT_FOLDER
} = require('../helpers/constants');

const getPathFolder = (folder) => {
  const isDevOrTesting = process.env.NODE_ENV === nodeEnv.dev || process.env.NODE_ENV === nodeEnv.test;
  return (isDevOrTesting)
    ? path.join(__dirname, '../..', EXAMPLE_PROJECT_FOLDER, folder)
    : path.join(rootPath, folder);
};

module.exports.ui = getPathFolder(uiFolder);
module.exports.assets = getPathFolder(assets.relPath);
module.exports.pages = getPathFolder(pages.relPath);
