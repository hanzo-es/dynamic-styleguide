const path = require('path');
const rootPath = require('./root-path');
const { loadIfExistOrNull } = require('./file-reader');
const parsedArgs = require('./parsed-args');
const {
  nodeEnv,
  EXAMPLE_PROJECT_FOLDER,
  CONFIG_FILE_NAME,
  allowedArgs
} = require('../helpers/constants');

/**
 * The project config file can have a `parent` node that refers another
 * config file to inherit from.
 *
 * @param {String} filePath
 * @param {String} fileName
 */
const loadConfigFile = (filePath, fileName) => {
  let parent = {};
  const config = JSON.parse(loadIfExistOrNull(path.join(filePath, fileName))) || {};
  if (config.parent) {
    parent = loadConfigFile(filePath, config.parent);
  }
  return {...parent, ...config};
};

const configFileName = parsedArgs.get(allowedArgs.customConfigFile) || CONFIG_FILE_NAME;
const isDevOrTesting = process.env.NODE_ENV === nodeEnv.dev || process.env.NODE_ENV === nodeEnv.test;
const userConfigFilePath = isDevOrTesting ? path.join(rootPath, EXAMPLE_PROJECT_FOLDER) : process.cwd();

const defaultConfig = require(path.join(__dirname, '../../default.config.json'));
const userConfig = loadConfigFile(userConfigFilePath, configFileName);

module.exports = {...defaultConfig, ...userConfig};
