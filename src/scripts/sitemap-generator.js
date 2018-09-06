const encodeUrl = require('encodeurl');
const fs = require('fs-extra');
const path = require('path');

const folderStructure = require('../lib/folder-structure');
const { ui: uiProjectFolder } = require('../lib/project-folders');
const blockLoaderStrategy = require('../lib/block-loader');
const styleCommentLoader = require('../lib/block-loader/style-comment.loader');
const { uiPathJoiner } = require('../helpers/path-helper');
const { elementsSitemapFile } = require('../lib/config-loader');
const rootPath = require('../lib/root-path');
const { nodeEnv, EXAMPLE_PROJECT_FOLDER } = require('../helpers/constants');

const isDevOrTesting = process.env.NODE_ENV === nodeEnv.dev || process.env.NODE_ENV === nodeEnv.test;

const XML_URLSET_TEMPLATE = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{{%urls}}
</urlset>`;

const XML_URL_TEMPLATE = `
  <url>
    <loc>{{%url}}</loc>
    <title>{{%title}}</title>
  </url>
  `;

const isElementFolder = (node) => {
  return node.type === 'directory' && node.children && node.children.reduce(
    (acc, child) => {
      // If there is an 'index.js' file, is an element folder
      return acc || child.name.toLowerCase() === 'index.js';
    }, false
  );
};

const locs = [];

const addLoc = (url, variant) => {
  const CONTENT_SLUG = 'content';
  const [, namespace, element] = url.split('/');

  let title = `${namespace}`;
  title += element ? ` - ${element}` : '';
  title += variant ? ` - ${variant}` : '';

  const encodedUrl = encodeUrl(`${CONTENT_SLUG}/${url}?variants=%5B\"${variant}\"%5D`);

  locs.push({
    url: encodedUrl,
    title
  });
};

const processNode = (node) => {
  if (isElementFolder(node)) {
    const basePath = uiPathJoiner(node.url.split('/'));
    const styleComment = blockLoaderStrategy.setLoader(styleCommentLoader).loadBlock(`${basePath}/styles.scss`);
    return styleComment.then(([parsedContent]) => {
      const { variants } = parsedContent ? parsedContent : {};
      if (variants) {
        const plainVariant = variants.reduce(
          (acc, v) => acc.concat(...Object.keys(v.entries)),
          []
        );
        plainVariant.forEach(v => addLoc(node.url, v));
      }else {
        addLoc(node.url);
      }
      return Promise.resolve('done');
    });
  } else if (node.children) {
    return Promise.all(node.children.map(processNode));
  }
  return Promise.resolve('none');
};

const sitemapGenerator = () => {
  if (!elementsSitemapFile) {
    return;
  }
  const elementDirs = ['components', 'modules'];
  const elements = folderStructure(uiProjectFolder).children.filter(
    node => node.type === 'directory' && elementDirs.includes(node.name)
  );
  const promises = elements.reduce((acc, element) => {
    return acc.concat(...element.children.map((firstLevel) => {
      return processNode(firstLevel);
    }));
  }, []);
  Promise.all(promises)
    .then(() => {
      const urlsEntries = locs.map(
        loc => XML_URL_TEMPLATE
          .replace('{{%url}}', loc.url)
          .replace('{{%title}}', loc.title)
      );
      const sitemap = XML_URLSET_TEMPLATE.replace('{{%urls}}', urlsEntries.join(''));

      let writeTo;
      if (isDevOrTesting) {
        writeTo = path.join(rootPath, EXAMPLE_PROJECT_FOLDER, elementsSitemapFile);
      } else {
        writeTo = path.join(rootPath, elementsSitemapFile);
      }
      fs.outputFile(writeTo, sitemap, 'utf8', (err) => {
        if(err) {
          return console.error(err);
        }
        console.log('\x1b[33m%s\x1b[0m', `Sitemap was written into ${writeTo}`);
      });
    });
};

module.exports = sitemapGenerator;
