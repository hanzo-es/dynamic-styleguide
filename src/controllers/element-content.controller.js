const express = require('express');
const router = express.Router();
const ContentModel = require('../models/content.model');
const AssetsModel = require('../models/assets.model');

const loadElementDetails = (req, res) => {
  const stylesheets = AssetsModel.getCSSDependencies();
  const scripts = AssetsModel.getJSDependencies();

  ContentModel.updateParams({...req.params, ...req.query});
  ContentModel.getElements( (err, payload) => {
    res.render('element-content', {
      stylesheets,
      scripts,
      ...payload,
      layout: false,
    });
  });
};

router.get('/:firstLevel', loadElementDetails);
router.get('/:firstLevel/:element', loadElementDetails);
router.get('/:firstLevel/:namespace/:element', loadElementDetails);

module.exports = router;
