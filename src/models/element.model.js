const blockLoaderStrategy = require('../lib/block-loader');
const readmeLoader = require('../lib/block-loader/readme.loader');
const styleCommentLoader = require('../lib/block-loader/style-comment.loader');
const folderStructure = require('../lib/folder-structure');
const rawLoader = require('../lib/block-loader/raw.loader');
const encodedLoader = require('../lib/block-loader/encoded.loader');
const { ui: uiProjectFolder } = require('../lib/project-folders');
const { getIndexTree } = require('../lib/sidebar-tree');
const { getDefinedExtraHandler } = require('../lib/extra-handlers');
const {
  README_FILE_NAME,
  EXAMPLE_FILE_NAME
} = require('../helpers/constants');
const {
  uiPathJoiner,
  pathJoinIfExist
} = require('../helpers/path-helper');

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
    const basePath = uiPathJoiner([firstLevel, namespace, element]);
    const selected = element || namespace || firstLevel || null;

    // Get the first level folders.
    const elements = getIndexTree();

    // Check if there are special handlers defined for the current element path
    const handlers = getDefinedExtraHandler(pathJoinIfExist([firstLevel, namespace, element]));

    // Object keys used in `handlerData`
    // color-grid : colors, allowedVariants
    // typography : typeset
    let handlerData = {};
    if (handlers.length) {
      handlerData = handlers.reduce((acc, handler) => {
        const loader = require(`../lib/block-loader/${handler.loaderName}`);
        const hd = blockLoaderStrategy.setLoader(loader).loadBlock({
          basePath,
          ...handler.config,
          uiProjectFolder
        });
        return {...acc, ...hd};
      }, handlerData);
    }

    const example = blockLoaderStrategy.setLoader(rawLoader).loadBlock(`${basePath}/${EXAMPLE_FILE_NAME}`);
    const encodedHTML = blockLoaderStrategy.setLoader(encodedLoader).loadBlock(example);

    const readme = blockLoaderStrategy.setLoader(readmeLoader).loadBlock({ path: `${basePath}/${README_FILE_NAME}`});
    const styleComment = blockLoaderStrategy.setLoader(styleCommentLoader).loadBlock(`${basePath}/styles.scss`);

    // For the selected element, get its children
    elements.children = elements.children.map( (child) => {
      if (child.name === firstLevel) {
        return {
          ...folderStructure(uiPathJoiner([firstLevel]), {selected, level: 1}),
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
      example: encodedHTML,
      handlerData
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
