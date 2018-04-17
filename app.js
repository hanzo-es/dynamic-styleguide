const express = require('express');
const path = require('path');
const createError = require('http-errors');
const { folders, nodeEnv } = require('./src/helpers/constants');

//INIT APP
const app = express();

// ADD VIEW ENGINE
const viewEngine = require(path.join(folders.lib, 'view-engine'));
viewEngine(app, folders.views);

// EXPRESS ADDONS
const expressAddons = require(path.join(folders.lib, 'express-addons'));
expressAddons(app, express, folders);

// DEFAULT ENTRY URL FOLDER
app.use(express.static(folders.public));

// Routing
app.use(require(folders.routes));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === nodeEnv.dev ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
