const fs = require('fs');
const xml2json = require('xml2json');
const {
  pages: pagesFolder
} = require('../lib/project-folders');
const { pages } = require('../lib/config-loader');
const { getIndexTree } = require('../lib/sidebar-tree');
const { createPageStructure } = require('../helpers/url-helper');

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
          const pagesFiles = createPageStructure(sitemap.urlset.url, {slug: pages.slug});

          const { firstLevel } = this.params;

          // Get the first level folders.
          const elements = getIndexTree();

          const pageNode = elements.children.find((item) => {
            return (item.name === 'pages');
          });

          // Mark page side menu entry as selected
          if (pageNode) {
            pageNode.isSelected = true;
            pageNode.level = 1;
            pageNode.hasClickableChildren = true;
            pageNode.isOpen = true;
          }

          callback( err, {
            elementType: firstLevel,
            elements,
            pagesFiles,
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
