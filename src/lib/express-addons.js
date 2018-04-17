const logger = require('morgan');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const transform = require('babel-transform-dir')
const path = require('path');

 
module.exports = function (app, express, folders){
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(sassMiddleware({
    src: folders.assets,
    dest: folders.public,
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    debug: false,
    force: false,
    //log: function (severity, key, value) { console.log(severity, 'node-sass-middleware', key, value); }
  }));
  
  // TODO: Find out how to use a middleware to transform the js files
  transform(path.join(folders.assets, 'scripts'), path.join(folders.public, 'scripts'), {
    babel: {  "presets": ['env'] }
  })
  .then(() => {
    console.log('babel transformation done')
  })
}
