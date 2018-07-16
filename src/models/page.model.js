const fs = require('fs');
const xml2json = require('xml2json');
const {
  pages: pagesFolder
} = require('../lib/project-folders');
const {
  pages
} = require('../lib/config-loader');
const { getIndexTree } = require('../lib/sidebar-tree');

const pageModel = {
  params: {
    firstLevel: '',
  },

  getPages(callback) {
    fs.readFile(`${pagesFolder}/sitemap.xml`, (err, data) => {
      if (!err) {
        // Parse sitemap.xml file present on `distFolder`
        const sitemap = JSON.parse(xml2json.toJson(data));

        // If sitemap found build `pagesFiles` array
        if (sitemap.urlset && sitemap.urlset.url) {
          const pagesFiles = sitemap.urlset.url.map((url) => {
            return {
              url: `${pages.slug}${url.loc}`,
              isSelected: false,
              level: 2,
              name: url.title,
              type: 'file',
              isPage: true
            };
          });

          const { firstLevel } = this.params;

          // Get the first level folders.
          const elements = getIndexTree();

          const pageNode = elements.children.find((item) => {
            return (item.name === 'pages');
          });

          // This adds pages to the `pages` node if present;
          if (pageNode) {
            pageNode.children = pagesFiles;
            pageNode.isSelected = true;
            pageNode.level = 1;
            pageNode.hasClickableChildren = true;
            pageNode.isOpen = true;
          }

          callback( err, {
            elementType: firstLevel,
            elements,
            selected: firstLevel
          } );
        }
      } else {
        console.error(`[Page.Model] Sitemap not found in ${pagesFolder}`);
        return false;
      }
    });
  },

  updateParams(params) {
    this.params = {...params};
  }

};

module.exports = pageModel;
