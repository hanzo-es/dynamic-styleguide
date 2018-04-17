const path = require('path');

const blockLoaderStrategy = require('../lib/block-loader');
const exampleLoader = require('../lib/block-loader/example.loader');
const renderedLoader = require('../lib/block-loader/rendered.loader');
const { ui: uiProjectFolder} = require ('../lib/project-folders');
const { EXAMPLE_FILE_NAME } = require('../helpers/constants')

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
    const content = blockLoaderStrategy.setLoader(renderedLoader).loadBlock(example);
    
    const payload = {
      content
    };

    callback ( err, payload );
  },

  updateParams(params) {
    this.params = {...params};
  }

}

module.exports = elementModel;
