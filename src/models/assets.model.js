const path = require('path');
const fs = require('fs');
const config = require('../lib/config-loader');
const rootPath = require('../lib/root-path');
const { nodeEnv } = require('../helpers/constants');

const assetsModel = {

  getCSSDependencies() {
    return config.bundled.css.map( cssFile => path.join(this.getDistFolder(), cssFile));
  },

  getJSDependencies() {
    return config.bundled.js.map( jsFile => path.join(this.getDistFolder(), jsFile));
  },

  getDistFolder() {
    return config.distFolder;
  },

  getFileFromPath(file, callback) {
    const filePath = (process.env.NODE_ENV === nodeEnv.dev)
      ? path.join(rootPath, 'example-project', this.getDistFolder(), file)
      : path.join(rootPath, this.getDistFolder(), file);

    let err;
    if (filePath.indexOf('..') !== -1) {
      err = 'Folder not allowed';
    } else if (!fs.existsSync(filePath)) {
      err = `File ${filePath} does not exist`;
    }

    callback(err, filePath);
  }
};

module.exports = assetsModel;
