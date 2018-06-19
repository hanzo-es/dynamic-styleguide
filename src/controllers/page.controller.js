const express = require('express');
const router = express.Router();
const PageModel = require('../models/page.model');
const { pages: { pagesUrlNamespace } } = require('../lib/config-loader');

const loadPageDetails = (req, res) => {
  PageModel.updateParams({firstLevel: pagesUrlNamespace});
  PageModel.getPages( (err, payload) => {
    res.render('index', {
      ...payload
    });
  });
};

router.get('/', loadPageDetails);


module.exports = router;
