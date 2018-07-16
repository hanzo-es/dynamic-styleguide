const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = require('../lib/root-path');
const {
  elementsUrlDirectory,
  pages,
  assets
} = require('../lib/config-loader');
const {
  pages: pagesFolder,
} = require('../lib/project-folders');

const { DEFAULT_ELEMENTS_URL_DIRECTORY } = require('../helpers/constants');

const LocalsController = require('../controllers/locals.controller');
const IndexController = require('../controllers/index.controller');
const ElementController = require('../controllers/element.controller');
const PageController = require('../controllers/page.controller');
const ElementContentController = require('../controllers/element-content.controller');
const AssetsController = require('../controllers/assets.controller');
const directory = elementsUrlDirectory || DEFAULT_ELEMENTS_URL_DIRECTORY;

router.use('/**', LocalsController);
router.use('/', IndexController );
router.use(`/${directory}/${pages.slug}`, PageController );
router.use(`/${directory}`, ElementController );
router.use(`/${assets.slug}`, AssetsController );
router.use('/content', ElementContentController );

// Pages Route
router.use(`/${pages.slug}`, express.static(pagesFolder));
console.log(`[Route] /${pages.slug} => ${pagesFolder}`);

router.use('/codemirror', express.static( path.join(rootPath, 'node_modules', 'codemirror') ));
console.log(`[Route] /codemirror => ${path.join(rootPath, 'node_modules', 'codemirror')}`);


module.exports = router;
