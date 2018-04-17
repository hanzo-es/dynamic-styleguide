const path = require('path');

const blockLoaderStrategy = require('../lib/block-loader');

const exampleLoader = require('../lib/block-loader/example.loader');
const encodedLoader = require('../lib/block-loader/encoded.loader');
const readmeLoader = require('../lib/block-loader/readme.loader');
const renderedLoader = require('../lib/block-loader/rendered.loader');
const styleCommentLoader = require('../lib/block-loader/style-comment.loader');
const { loadIfExistOrNull } = require('../lib/file-reader');
const folderStructure = require('../lib/folder-structure');
const config = require('../lib/config-loader');
const { ui: uiProjectFolder} = require ('../lib/project-folders');
const {
  README_FILE_NAME,
  EXAMPLE_FILE_NAME
} = require('../helpers/constants')

const pathJoiner = (segments) => path.join(uiProjectFolder , ...segments.filter((segment) => segment ));

const elementModel = {
  params : {
    uiProjectFolder,
    firstLevel : '',
    element : '',
    namespace : ''
  },

  getElements(callback) {
    const err = null;
    const basePath = pathJoiner([this.params.firstLevel,this.params.namespace,this.params.element]);

    const example = blockLoaderStrategy.setLoader(exampleLoader).loadBlock(`${basePath}/${EXAMPLE_FILE_NAME}`);
    const encodedHTML = blockLoaderStrategy.setLoader(encodedLoader).loadBlock(example);
    const readme = blockLoaderStrategy.setLoader(readmeLoader).loadBlock({ path:`${basePath}/${README_FILE_NAME}`});
    const styleComment = blockLoaderStrategy.setLoader(styleCommentLoader).loadBlock(`${basePath}/styles.scss`);
    
    const payload = {
      elementType: this.params.firstLevel,
      elements: folderStructure(pathJoiner([this.params.firstLevel])),
      selected: this.params.element,
      readme,
      example: encodedHTML
    };

    styleComment.then(([parsedContent]) => {
      const { variants, exclusiveVariants } = parsedContent ? parsedContent : {};
      const hasVariants = !!variants || !!exclusiveVariants

      callback ( err, {
        ...payload,
        variants,
        exclusiveVariants,
        hasVariants
      } )
    });
  },


  updateParams(params) {
    this.params = {...params};
  }

}

module.exports = elementModel;
