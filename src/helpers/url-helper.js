const PAGES_ARRAY = 'pagesArray';

/**
 * Receives the defines entries in the sitemap.xml file and returns an object
 * that represent the structure of folders and pages.
 * Each folder is a node in this object, and the pages are inside an array, in
 * the `PAGES_ARRAY` node.
 * Eg.:
 * ```
 * {
 *   "pagesArray": [{
 *     "url": "pages/page-one.html",
 *     "name": "Page One"
 *   }],
 *   "folder": {
 *     "pagesArray": [{
 *       "url": "pages/folder/page-two.html",
 *       "name": "Page Two"
 *     }]
 *   },
 *   "other-folder": {
 *     "pagesArray": [{
 *       "url": "pages/other-folder/page-three.html",
 *       "name": "Page Three"
 *     }, {
 *       "url": "pages/other-folder/page-four.html",
 *       "name": "Page Four"
 *     }],
 *     "subfolder": {
 *       "pagesArray": [{
 *         "url": "pages/other-folder/subfolder/page-five.html",
 *         "name": "Page Five"
 *       }]
 *     }
 *   }
 * }
 * ```
 * @param {Array} urls
 * @param {Object} opts
 */
const createPageStructure = (urls, opts) => {
  const defaultOptions = {
    slug: ''
  };
  const { slug } = {...defaultOptions, ...opts};
  const htmlFileRegEx = /.+\.html/;
  const ignoreInitialSlashRegEx = /^\/?(.+)$/;


  const populateNode = (node, urlArray, url) => {
    const newNode = {...node};
    const current = urlArray[0];
    const isPage = htmlFileRegEx.test(current) || // ends with `html`
                   urlArray.length === 1 ||       // is the last slug
                   urlArray[1] === '';            // ends with `/`

    if (isPage) {
      const page = {
        url: `${slug}${url.loc}`,
        name: url.title
      };
      newNode[PAGES_ARRAY] ? newNode[PAGES_ARRAY].push(page) : newNode[PAGES_ARRAY] = [page];
    } else {
      newNode[current] = populateNode(newNode[current] || {}, urlArray.slice(1), url);
    }
    return newNode;
  };


  return urls.reduce((acc, url) => {
    const urlArray = url.loc.match(ignoreInitialSlashRegEx, 'g')[1].split('/');
    return populateNode(acc, urlArray, url);
  }, {});
};

module.exports = {
  createPageStructure
}
;
