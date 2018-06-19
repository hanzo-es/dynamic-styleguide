const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = require('../lib/root-path');
const {
  distFolder,
  elementsUrlDirectory,
  pages: {
    pagesUrlNamespace
  },
} = require('../lib/config-loader');
const { assets: assetsFolder} = require('../lib/project-folders');

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
router.use(`/${directory}/${pagesUrlNamespace}`, PageController );
router.use(`/${directory}`, ElementController );
router.use(`/${distFolder}`, AssetsController );
router.use('/content', ElementContentController );

// Pages routes
router.use(`/${pagesUrlNamespace}`, express.static(assetsFolder));


router.use('/codemirror', express.static( path.join(rootPath, 'node_modules', 'codemirror') ));


module.exports = router;
