const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const path = require('path');
const registerHelpers = require('../helpers/register-hbs-helpers');
const { pageTitle} = require('./config-loader');

module.exports = function (app, viewsFolder){
  // view engine setup
  app.set('views', viewsFolder);
  app.set('view engine', 'hbs');

  registerHelpers(hbs);

  hbs.localsAsTemplateData(app);
  app.locals.localStyles = [
    '/stylesheets/style.css',
    '/codemirror/lib/codemirror.css',
    '/codemirror/theme/tomorrow-night-bright.css',
  ]
  app.locals.localScripts = [
    process.env.BROWSER_REFRESH_URL,
    '/codemirror/lib/codemirror.js',
    '/codemirror/mode/xml/xml.js',
    '/codemirror/mode/css/css.js',
    '/codemirror/mode/javascript/javascript.js',
    '/codemirror/mode/htmlmixed/htmlmixed.js',
    '/scripts/main.js'
  ]
  app.locals.title = pageTitle;

  const partialsFolder = path.join(viewsFolder, 'partials');

  // hbs partials watcher
  hbsutils.registerWatchedPartials(
    partialsFolder,
    {
      precompile: false,
      onchange: (template) => { console.log (`updated: ${template}`)},
    },
    () => { console.log (`registered all partials`)},
  );
}
