const fs = require('fs')
const path = require('path');
const { ui: uiProjectFolder} = require ('./project-folders');

/**
 * Map a folder structure
 *
 * @param {String} starting dir to start reading
 * @return {JSON}
 */
const folderStructure = (dir, urlSegment = '') => {
  const isDirectory = fs.statSync(dir).isDirectory();

  // Don't add uiProjectFolder to base url for components
  const name = (path.basename(dir) != path.basename(uiProjectFolder) )? path.basename(dir) : '';
  // const name = path.basename(dir)
  const url = path.join(urlSegment, name);
  const node = {
    name,
    url,
    type: isDirectory ? 'directory' : 'file',
  };

  if (isDirectory) {
    node.children = fs.readdirSync(dir).map((file) => {
      return folderStructure(`${dir}/${file}`, url);
    });
    node.isLastFolder = node.children.every((child) => child.type === 'file');
  }
  return node;
}

module.exports = folderStructure;
