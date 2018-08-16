const { filesList } = require('../file-reader');
const { pathJoinIfExist: join } = require('../../helpers/path-helper');
const blockLoaderStrategy = require('../block-loader');
const rawLoader = require('../block-loader/raw.loader');

const ICONS_FOLDER = 'assets';
const iconFileRegEx = /.+\.svg/i;

const IconsTableLoader = {
  loadBlock({basePath, containerTemplate}) {
    const fullPathIconsFolder = join([basePath, ICONS_FOLDER]);
    const names = filesList(fullPathIconsFolder);
    const icons = names.filter(n => iconFileRegEx.test(n)).map(name => {
      const content = blockLoaderStrategy.setLoader(rawLoader).loadBlock(join([fullPathIconsFolder, name]));
      return {
        name,
        content
      };
    });
    return {
      icons,
      iconContainerTemplate: containerTemplate
    };
  }
};

module.exports = IconsTableLoader;
