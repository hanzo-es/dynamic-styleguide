const blockLoaderStrategy = require('../block-loader');
const rawLoader = require('../block-loader/raw.loader');
const { editorSyntaxes } = require('../../helpers/constants');
const { uiPathJoiner } = require('../../helpers/path-helper');
const {
  parseContent: staticParseContent,
  parseExamples: staticParseExamples
} = require('./static.addon');

const JSON_FILE_NAME = 'hugo.json';
const TEMPLATE_FILE_NAME = 'template.html';

const hugoAddon = {
  parseContent: staticParseContent,
  parseExamples(params) {
    const examples = [...staticParseExamples(params)];
    const {firstLevel, namespace, element} = params;
    const basePath = uiPathJoiner([firstLevel, namespace, element]);
    const rawBlockLoader =  blockLoaderStrategy.setLoader(rawLoader);
    const rawTemplate = rawBlockLoader.loadBlock(`${basePath}/${TEMPLATE_FILE_NAME}`);
    const rawJson = rawBlockLoader.loadBlock(`${basePath}/${JSON_FILE_NAME}`);

    if (rawTemplate) {
      examples.push({
        fileName: TEMPLATE_FILE_NAME,
        content: rawTemplate,
        mode: editorSyntaxes.html,
        readOnly: true
      });
    }
    if (rawJson) {
      examples.push({
        fileName: JSON_FILE_NAME,
        content: rawJson,
        mode: editorSyntaxes.javascript,
        readOnly: true
      });
    }
    return examples;
  }
};

module.exports = hugoAddon;
