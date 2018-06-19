const path = require('path');
const blockLoaderStrategy = require('../lib/block-loader');
const rawLoader = require('../lib/block-loader/raw.loader');
const pagesCommentLoader = require('../lib/block-loader/pages-comment.loader');
const folderStructure = require('../lib/folder-structure');
const {
  pages: pagesFolder
} = require('../lib/project-folders');
const { getIndexTree } = require('../lib/sidebar-tree');

const removeLastFolder = (dirPath) => dirPath.split('/').slice(0, -1).join('/');

const pageModel = {
  params: {
    firstLevel: '',
  },

  getPages(callback) {
    const err = null;
    const { firstLevel } = this.params;

    // Get the first level folders.
    const elements = getIndexTree();

    // For the selected element, get its children
    elements.children = elements.children.map( (child) => {
      if (child.name === firstLevel) {
        const pagesFiles = folderStructure(pagesFolder, {selected: firstLevel, level: 1});
        const htmlFilesRegEx = /[\w-]*\.html/;
        pagesFiles.children = pagesFiles.children.map(pageFile => {
          if (htmlFilesRegEx.test(pageFile.name)) {
            const rawPage = blockLoaderStrategy.setLoader(rawLoader).loadBlock(path.join(removeLastFolder(pagesFolder), pageFile.url ));
            const pageComments = blockLoaderStrategy.setLoader(pagesCommentLoader).loadBlock(rawPage);
            return {
              ...pageFile,
              name: pageComments.title || pageFile.name,
              isPage: true
            };
          }
        });

        return {
          ...pagesFiles,
          isFirstLevel: true,
          hasClickableChildren: pagesFiles.children.length > 0,
          isSelected: true,
          isOpen: true
        };
      }
      return {...child, isFirstLevel: true};
    });
    callback( err, {
      elementType: firstLevel,
      elements,
      selected: firstLevel
    } );
  },

  updateParams(params) {
    this.params = {...params};
  }

};

module.exports = pageModel;
