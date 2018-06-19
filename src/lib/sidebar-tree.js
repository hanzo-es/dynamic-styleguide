const folderStructure = require('./folder-structure');
const {
  ui: uiProjectFolder,
  pages: pagesFolder
} = require('./project-folders');

const getIndexTree = () => {
  const elements = folderStructure(uiProjectFolder, {deepLevel: 1});
  const pages = folderStructure(pagesFolder, {deepLevel: 1});
  if (!!pages) {
    elements.children.push(pages);
  }
  elements.children = elements.children.map(child => ({...child, isFirstLevel: true}));
  return elements;
};

module.exports.getIndexTree = getIndexTree;
