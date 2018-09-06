const express = require('express');
const path = require('path');
const { folders } = require('./src/helpers/constants');
const sitemapGenerator = require('./src/scripts/sitemap-generator');

// INIT APP
const app = express();

// EXPRESS ADDONS
const expressAddons = require(path.join(folders.lib, 'express-addons'));
expressAddons(app, express, folders);

// ADD VIEW ENGINE
const viewEngine = require(path.join(folders.lib, 'view-engine'));
viewEngine(app, folders.views);

// DEFAULT ENTRY URL FOLDER
app.use(express.static(folders.public));

// Routing
app.use(require(folders.routes));

// Handle 404
app.use(function(req, res) {
  res.status(400);
  res.render('error', {
    title: '404: File Not Found'
  });
});

sitemapGenerator();

// Handle 500
app.use(function(error, req, res) {
  res.status(500);
  res.render('error', {
    title: '500: Internal Server Error',
    error: error
  });
});

module.exports = app;
