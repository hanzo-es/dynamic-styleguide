const { loadIfExistOrNull } = require('../file-reader');

const ExampleLoader = {
  loadBlock(path) {
    return loadIfExistOrNull(path) || '';
  }
};

module.exports = ExampleLoader;
