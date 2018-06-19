const fs = require('fs');
const path = require('path');
const { ui: uiProjectFolder} = require('./project-folders');
const { DS_IGNORED_FOLDERS } = require('../helpers/constants');

const defaultOptions = {
  urlSegment: '',
  deepLevel: Infinity,
  selected: null,
  level: 0
};

/**
 * Map a folder structure
 *
 * @param {String} starting dir to start reading
 * @return {Object}
 */
const folderStructure = (dir, options = {}) => {
  if (fs.existsSync(dir)) {
    const { urlSegment, deepLevel, selected, level } = {...defaultOptions, ...options};
    const isDirectory = fs.statSync(dir).isDirectory();

    // Don't add uiProjectFolder to base url for components
    const name = (path.basename(dir) !== path.basename(uiProjectFolder) ) ? path.basename(dir) : '';
    const url = path.join(urlSegment, name);
    const node = {
      name,
      url,
      type: isDirectory ? 'directory' : 'file',
      isSelected: selected === name,
      level
    };

    if (isDirectory && deepLevel > 0) {
      node.children = fs.readdirSync(dir).map((file) => {
        const newOptions = {
          urlSegment: url,
          deepLevel: deepLevel - 1,
          selected,
          level: level + 1
        };
        return folderStructure(`${dir}/${file}`, newOptions );
      });
      node.isClickable = !DS_IGNORED_FOLDERS.includes(node.name);
      node.hasClickableChildren = node.children.some(
        child => child.isClickable || child.hasClickableChildren
      );
      node.isOpen =
        node.hasClickableChildren &&
        (node.isSelected ||
        node.children.some(child => child.isSelected || child.isOpen));
    }
    return node;
  }
  return null;
};

module.exports = folderStructure;
