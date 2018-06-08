const fs = require('fs');
const path = require('path');
const rootPath = require('./root-path');

const dirsList = (rootDir) => {
  const files = fs.readdirSync(rootDir);
  return files.reduce((acc, file) => fs.statSync(rootDir + '/' + file).isDirectory() ? acc.concat(file) : acc, []);
};

const loadIfExistOrNull = (filePath) => fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;

const loadUserPackagesJson = () =>
  loadIfExistOrNull(path.join(rootPath, 'package.json'));

module.exports = {
  dirsList,
  loadIfExistOrNull,
  loadUserPackagesJson,
};
