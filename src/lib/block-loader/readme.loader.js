const showdown = require('showdown');
const { loadIfExistOrNull } = require('../file-reader');

const ReadmeLoader = {
  loadBlock(data) {
    const markDown = loadIfExistOrNull(data.path) || '';
    const converter = new showdown.Converter({tables: true});

    return converter.makeHtml(markDown);
  }
};

module.exports = ReadmeLoader;
