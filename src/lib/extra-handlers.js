
const { extraHandlers } = require('../lib/config-loader');
const getDefinedExtraHandler = (path) => {
  return extraHandlers ? extraHandlers.filter((handler) => handler.folder === path) : [];
};

module.exports = {
  getDefinedExtraHandler
};
