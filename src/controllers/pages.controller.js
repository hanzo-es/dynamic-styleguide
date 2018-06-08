const express = require('express');
const router = express.Router({strict: true});
const { join } = require('path');
const { pages: pageTitle } = require('../lib/config-loader');
const PageModel = require('../models/page.model');
const { distPages: distPagesFolder} = require('../lib/project-folders');


const loadPages = (req, res) => {
  const { originalUrl } = req;
  // If the requested URL is not the root oor the index.html file, serve the
  // requested page, if not, generate the cover.
  if (originalUrl !== '/' && originalUrl !== '/index.html') {
    res.sendFile(join(distPagesFolder, originalUrl));
  } else {
    PageModel.updateParams({
      url: originalUrl
    });
    PageModel.getPageData( (err, payload) => {
      res.locals.localStyles = [
        '/assets/style.css',
      ];
      res.locals.localScripts = [
        process.env.BROWSER_REFRESH_URL,
        '/assets/main.js'
      ];
      res.locals.title = pageTitle;
      res.render('pages-cover', {
        ...payload,
      });
    });
  }
};

router.get('/', loadPages);

module.exports = router;
