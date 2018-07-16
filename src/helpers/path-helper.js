const path = require('path');
const { ui: uiProjectFolder } = require('../lib/project-folders');

const pathJoinIfExist = (paths) => path.join(...paths.filter(s=>s));

const uiPathJoiner = (segments) => path.join(uiProjectFolder, pathJoinIfExist(segments));

module.exports = {
  uiPathJoiner,
  pathJoinIfExist
};
