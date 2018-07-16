
const staticAddon = require('./addons/static.addon');
const { projectType } = require('../lib/config-loader');
const { supportedProjectTypes } = require('../helpers/constants');

const parseElement = (params) => {
  const { html: HTML } = supportedProjectTypes;

  let parser;
  switch (projectType) {
    case HTML:
    default:
      parser = staticAddon;
      break;
  }
  return parser.parse(params);
};

module.exports = {
  parseElement
};
