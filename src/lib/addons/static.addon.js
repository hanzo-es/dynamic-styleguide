const blockLoaderStrategy = require('../block-loader');
const rawLoader = require('../block-loader/raw.loader');
const renderedLoader = require('../block-loader/rendered.loader');
const {
  EXAMPLE_FILE_NAME,
  VARIANT_REF
} = require('../../helpers/constants');
const { uiPathJoiner } = require('../../helpers/path-helper');

const StaticAddon = {
  parse(params) {
    const {firstLevel, namespace, element} = params;
    const basePath = uiPathJoiner([firstLevel, namespace, element]);

    const example = blockLoaderStrategy.setLoader(rawLoader).loadBlock(`${basePath}/${EXAMPLE_FILE_NAME}`);
    const replaced = example.replace(VARIANT_REF, '');
    const content = blockLoaderStrategy.setLoader(renderedLoader).loadBlock(replaced);

    return content;
  }
};

module.exports = StaticAddon;
