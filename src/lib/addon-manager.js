
const { projectType } = require('../lib/config-loader');
const { supportedProjectTypes } = require('../helpers/constants');

const PARSE_EXAMPLE = 'example';
const PARSE_CONTENT = 'content';
const {
  html: HTML,
  hugo: HUGO
} = supportedProjectTypes;

const parseElement = (type) => (params) => {
  let parser;
  switch (projectType.toLowerCase()) {
    case HUGO:
      parser = require('./addons/hugo.addon');
      break;
    case HTML:
    default:
      parser = require('./addons/static.addon');
      break;
  }
  const {parseExamples, parseContent } = parser;
  return (type === PARSE_EXAMPLE) ? parseExamples(params) : parseContent(params);
};

module.exports = {
  parseElementContent: parseElement(PARSE_CONTENT),
  parseElementExamples: parseElement(PARSE_EXAMPLE)
};
