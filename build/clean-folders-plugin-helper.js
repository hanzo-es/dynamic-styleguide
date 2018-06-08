const CleanWebpackPlugin = require('clean-webpack-plugin');

const defaultOptions = {
  root: __dirname, // Absolute path to your webpack root folder (paths appended to this), Default: root of your package
  verbose: true, // Write logs to console.
  dry: false, // Use boolean "true" to test/emulate delete. (will not remove files). Default: false - remove files
  watch: false, // If true, remove files on recompile. Default: false
  exclude: [], // Instead of removing whole path recursively, remove all path's content with exclusion of provided immediate children. Good for not removing shared files from build directories.
  allowExternal: false, // allow the plugin to clean folders outside of the webpack root. Default: false - don't allow clean folder outside of the webpack root
  beforeEmit: false // perform clean just before files are emitted to the output dir. Default: false
}

module.exports = (pathsToClean, options) => {
  const cleanOptions = {
    defaultOptions,
    ...options
  };

  return new CleanWebpackPlugin(pathsToClean, cleanOptions);
};
