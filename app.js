const express = require('express');
const path = require('path');
const { folders, allowedArgs } = require('./src/helpers/constants');
const parsedArgs = require('./src/lib/parsed-args');

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
// Here we can serve and handle the styleguide (UI folder) or the example pages
// (pages folder). Styleguide is used by default

if (!!parsedArgs.get(allowedArgs.deployPages)) {
  app.use(require(path.join(folders.routes, 'pages')));
} else {
  app.use(require(path.join(folders.routes, 'styleguide')));
}

// Handle 404
app.use(function(req, res) {
  res.status(400);
  res.render('error', {
    title: '404: File Not Found'
  });
});

// Handle 500
app.use(function(error, req, res) {
  res.status(500);
  res.render('error', {
    title: '500: Internal Server Error',
    error: error
  });
});

module.exports = app;
