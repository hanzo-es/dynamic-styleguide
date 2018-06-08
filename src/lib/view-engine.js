const hbs = require('hbs');
const path = require('path');
const registerHelpers = require('../helpers/register-hbs-helpers');

module.exports = function(app, viewsFolder) {
  // view engine setup
  app.set('views', viewsFolder);
  app.set('view engine', 'hbs');

  registerHelpers(hbs);

  hbs.localsAsTemplateData(app);

  const partialsFolder = path.join(viewsFolder, 'partials');
  hbs.registerPartials(partialsFolder,
    () => {
      // eslint-disable-next-line
      console.log('registered all partials');
      // Tell 'browser-refresh' that refresh the page
      if (process.send) {
        process.send('online');
      }
      app.emit('online');
    }
  );
};
