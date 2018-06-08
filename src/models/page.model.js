const { join } = require('path');
const blockLoaderStrategy = require('../lib/block-loader');
const rawLoader = require('../lib/block-loader/raw.loader');
const pagesCommentLoader = require('../lib/block-loader/pages-comment.loader');
const { pages: pagesProjectFolder} = require('../lib/project-folders');
const folderStructure = require('../lib/folder-structure');

const changeChildStructure = (child = []) => child.map(({name, type, children, url}) => {
  // Remove the first folder name from the url
  const filePath = url.split('/').slice(1).join('/');
  let title;
  if (type === 'file') {
    const rawPage = blockLoaderStrategy.setLoader(rawLoader).loadBlock(join(pagesProjectFolder, filePath ));
    const pageComments = blockLoaderStrategy.setLoader(pagesCommentLoader).loadBlock(rawPage);
    title = pageComments.title;
  } else {
    title = name;
  }
  return {
    title,
    href: filePath,
    type,
    children: changeChildStructure(children)
  };
});

const pageModel = {

  params: {
    url: '',
    scriptPaths: [],
    stylePaths: []
  },

  updateParams(params) {
    this.params = {...params};
  },

  getPageData(callback) {
    const err = null;

    const pagesFiles = folderStructure(pagesProjectFolder);
    const pages = changeChildStructure(pagesFiles.children);

    callback( err, {pages} );
  }

};

module.exports = pageModel;
