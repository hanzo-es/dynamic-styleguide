const path = require('path');
const { rootPath } = require('get-root-path');
const { loadIfExistOrNull } = require('./file-reader')
const {
  nodeEnv,
  EXAMPLE_PROJECT_FOLDER,
  CONFIG_FILE_NAME
} = require('../helpers/constants');


const userConfigFilePath = () => {
  return (process.env.NODE_ENV === nodeEnv.dev)
  ? path.join(rootPath, EXAMPLE_PROJECT_FOLDER, CONFIG_FILE_NAME)
  : path.join(process.cwd(), CONFIG_FILE_NAME);
};

const defaultConfig = require(path.join(__dirname, '../../default.config.json'));
const userConfig = JSON.parse(loadIfExistOrNull(userConfigFilePath())) || {};

module.exports = {...defaultConfig, ...userConfig};
