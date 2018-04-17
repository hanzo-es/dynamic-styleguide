const express = require('express');
const router = express.Router();
const AssetsModel = require('../models/assets.model');
const ElementModel = require('../models/element.model');

const loadData = (req, res) => {
  const stylesheets = AssetsModel.getCSSDependencies();
  const scripts = AssetsModel.getJSDependencies();

  ElementModel.updateParams(req.params);
  ElementModel.getElements( (err, payload) => {
    res.render('index',
      {
        stylesheets,
        scripts,
        ...payload
      })
  });
};

router.get('/', loadData);

module.exports = router;
