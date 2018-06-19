const express = require('express');
const router = express.Router();

const {
  contents: {
    pageTitle,
    logo,
    sideMenuLinks,
  },
  elementsUrlDirectory
} = require('../lib/config-loader');

const { DEFAULT_ELEMENTS_URL_DIRECTORY } = require('../helpers/constants');
const { loadUserPackagesJson } = require('../lib/file-reader');
const userPackage = JSON.parse(loadUserPackagesJson());

const setLocals = (req, res, next) => {
  res.locals.localStyles = [
    '/assets/styles.css',
    '/codemirror/lib/codemirror.css',
    '/codemirror/theme/ttcn.css',
  ];
  res.locals.localScripts = [
    process.env.BROWSER_REFRESH_URL,
    '/assets/app.js'
  ];
  res.locals.title = pageTitle;
  res.locals.logo = logo || {};
  res.locals.sideMenuLinks = sideMenuLinks || [];
  res.locals.elementsUrlDirectory = elementsUrlDirectory || DEFAULT_ELEMENTS_URL_DIRECTORY;
  res.locals.projectVersion = userPackage ? userPackage.version : null;

  next();
};

router.get('/*', setLocals);

module.exports = router;
