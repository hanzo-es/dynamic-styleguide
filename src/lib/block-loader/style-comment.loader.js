const sassdoc = require('sassdoc');
const { existsSync } = require('fs');
const { join } = require('path');
const { nodeEnv } = require('../../helpers/constants');

const sassdocConfig = {
  verbose: process.env.NODE_ENV === nodeEnv.dev,
  theme: join(__dirname, 'sassdoc-theme-hanzo-styleguide')
};

const StyleCommentLoader = {
  loadBlock(data) {
    return existsSync(data) ? sassdoc.parse(data, sassdocConfig) : Promise.resolve([null]);
  }
};

module.exports = StyleCommentLoader;
