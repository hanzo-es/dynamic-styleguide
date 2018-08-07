const folderStructure = require('./folder-structure');
const {
  ui: uiProjectFolder,
  pages: pagesFolder
} = require('./project-folders');

const getIndexTree = () => {
  const elements = folderStructure(uiProjectFolder, {deepLevel: 1});

  // Set priority to 'core' node/folder inside the elements array.
  const CORE = 'core';
  elements.children.sort((a, b) => {
    if  (a.name === CORE || b.name === CORE) {
      return a.name !== CORE || b.name === CORE;
    }
    return 0;
  });
  const pages = folderStructure(pagesFolder, {deepLevel: 0});
  if (!!pages) {
    elements.children.push(pages);
  }
  elements.children = elements.children.map(child => ({...child, isFirstLevel: true}));
  return elements;
};

module.exports.getIndexTree = getIndexTree;
