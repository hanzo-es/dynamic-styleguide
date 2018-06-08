const express = require('express');
const router = express.Router();
const ElementModel = require('../models/element.model');

const loadElementDetails = (req, res) => {
  ElementModel.updateParams(req.params);
  ElementModel.getElements( (err, payload) => {
    res.render('index', {
      ...payload,
      iframeSource: `/content${req.path}`,
      levelClasses: ['', 'first-level', 'second-level', 'third-level'],
    });
  });
};

router.get('/:firstLevel', loadElementDetails);
router.get('/:firstLevel/:element', loadElementDetails);
router.get('/:firstLevel/:namespace/:element', loadElementDetails);


module.exports = router;
