const blockLoaderStrategy = require('../block-loader');
const rawLoader = require('../block-loader/raw.loader');
const renderedLoader = require('../block-loader/rendered.loader');
const encodedLoader = require('../block-loader/encoded.loader');
const {
  EXAMPLE_FILE_NAME,
  VARIANT_REF,
  editorSyntaxes
} = require('../../helpers/constants');
const { uiPathJoiner } = require('../../helpers/path-helper');

const staticAddon = {
  parseContent(params) {
    const {firstLevel, namespace, element, variants} = params;
    const basePath = uiPathJoiner([firstLevel, namespace, element]);

    const example = blockLoaderStrategy.setLoader(rawLoader).loadBlock(`${basePath}/${EXAMPLE_FILE_NAME}`);
    const replaced = example.replace(VARIANT_REF, JSON.parse(variants ? variants : '[]').join(' '));
    const content = blockLoaderStrategy.setLoader(renderedLoader).loadBlock(replaced);

    return content;
  },
  parseExamples(params) {
    const examples = [];
    const {firstLevel, namespace, element} = params;
    const basePath = uiPathJoiner([firstLevel, namespace, element]);
    const rawExample = blockLoaderStrategy.setLoader(rawLoader).loadBlock(`${basePath}/${EXAMPLE_FILE_NAME}`);
    const encodedHTML = blockLoaderStrategy.setLoader(encodedLoader).loadBlock(rawExample);

    if (encodedHTML) {
      examples.push({
        fileName: EXAMPLE_FILE_NAME,
        content: encodedHTML,
        mode: editorSyntaxes.html
      });
    }
    return examples;
  }
};

module.exports = staticAddon;
