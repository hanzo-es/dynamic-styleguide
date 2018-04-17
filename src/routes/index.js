const express = require('express');
const router = express.Router();
const path = require('path');
const { rootPath } = require('get-root-path');
const config = require('../lib/config-loader');
const { assets } = require('../lib/project-folders');

const IndexController = require('../controllers/index.controller');
const ElementController = require('../controllers/element.controller');
const ElementContentController = require('../controllers/element-content.controller');
const AssetsController = require('../controllers/assets.controller');

router.use('/', IndexController );

router.use('/view', ElementController );
// TODO: FIX this is a hack to avoid errors on index route
router.use('/view/ui', ElementController );
router.use(`/${config.distFolder}`, AssetsController );

router.use('/content', ElementContentController )

router.use('/codemirror', express.static( path.join(rootPath, 'node_modules', 'codemirror') ));

module.exports = router
