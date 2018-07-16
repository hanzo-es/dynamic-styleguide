const path = require('path');
const fs = require('fs');
const config = require('../lib/config-loader');
const rootPath = require('../lib/root-path');
const {
  nodeEnv,
  EXAMPLE_PROJECT_FOLDER,
} = require('../helpers/constants');

const assetsModel = {

  getCSSDependencies() {
    return config.bundled.css;
  },

  getJSDependencies() {
    return config.bundled.js;
  },

  getDistFolder() {
    return config.assets.relPath;
  },

  getFileFromPath(file, callback) {
    const filePath = (process.env.NODE_ENV === nodeEnv.dev)
      ? path.join(rootPath, EXAMPLE_PROJECT_FOLDER, this.getDistFolder(), file)
      : path.join(rootPath, this.getDistFolder(), file);

    let err;
    if (filePath.indexOf('..') !== -1) {
      err = 'Folder not allowed';
    } else if (!fs.existsSync(filePath)) {
      err = `[Assets.Model] File ${filePath} does not exist`;
    }

    callback(err, filePath);
  }
};

module.exports = assetsModel;
