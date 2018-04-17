const fs = require('fs')
const path = require('path');

var walkSync = function(dir, fl) {
  var files = fs.readdirSync(dir);
  var fileList = fl || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      fileList = walkSync(dir + '/' + file, fileList);
    }
    else {
      fileList.push(file);
    }
  });
  return fileList;
};

const dirsList = (rootDir) => {
  const files = fs.readdirSync(rootDir);
  return files.reduce((acc, file) => fs.statSync(rootDir + '/' + file).isDirectory() ? acc.concat(file) : acc, [])
}

const loadIfExistOrNull = (filePath) => fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;

module.exports = {
  dirsList,
  loadIfExistOrNull
}
