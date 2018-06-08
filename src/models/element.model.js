const path = require('path');

const blockLoaderStrategy = require('../lib/block-loader');

const rawLoader = require('../lib/block-loader/raw.loader');
const encodedLoader = require('../lib/block-loader/encoded.loader');
const readmeLoader = require('../lib/block-loader/readme.loader');
const styleCommentLoader = require('../lib/block-loader/style-comment.loader');
const folderStructure = require('../lib/folder-structure');
const { ui: uiProjectFolder} = require('../lib/project-folders');
const {
  README_FILE_NAME,
  EXAMPLE_FILE_NAME
} = require('../helpers/constants');

const pathJoiner = (segments) => path.join(uiProjectFolder, ...segments.filter((segment) => segment ));

const elementModel = {
  params: {
    uiProjectFolder,
    firstLevel: '',
    element: '',
    namespace: ''
  },

  getElements(callback) {
    const err = null;
    const {firstLevel, namespace, element} = this.params;
    const basePath = pathJoiner([firstLevel, namespace, element]);
    const selected = element || namespace || firstLevel || null;
    const example = blockLoaderStrategy.setLoader(rawLoader).loadBlock(`${basePath}/${EXAMPLE_FILE_NAME}`);
    const encodedHTML = blockLoaderStrategy.setLoader(encodedLoader).loadBlock(example);
    const readme = blockLoaderStrategy.setLoader(readmeLoader).loadBlock({ path: `${basePath}/${README_FILE_NAME}`});
    const styleComment = blockLoaderStrategy.setLoader(styleCommentLoader).loadBlock(`${basePath}/styles.scss`);

    // Get the first level folders. For the current one, get its children
    const elements = folderStructure(uiProjectFolder, {deepLevel: 1});

    elements.children = elements.children.map( (child) => {
      if (child.name === firstLevel) {
        return {
          ...folderStructure(pathJoiner([firstLevel]), {selected, level: 1}),
          isFirstLevel: true
        };
      }
      return {...child, isFirstLevel: true};
    });

    const payload = {
      elementType: firstLevel,
      elements,
      selected,
      readme,
      example: encodedHTML
    };

    styleComment.then(([parsedContent]) => {
      const { variants } = parsedContent ? parsedContent : {};
      const hasVariants = !!variants;

      callback( err, {
        ...payload,
        variants,
        hasVariants
      } );
    });
  },


  updateParams(params) {
    this.params = {...params};
  }

};

module.exports = elementModel;
