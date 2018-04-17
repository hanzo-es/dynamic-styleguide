const express = require('express');
const router = express.Router();
const assetsModel = require('../models/assets.model');

const loadAsset = (req, res) => {
  const file = req.params[0];

  assetsModel.getFileFromPath(file, (err, payload) => {
    if (err) {
      res.status = 404;
      res.send(err);
    }else {
      res.sendFile(payload);
    }
  });
};

router.get('/*', loadAsset);

module.exports = router;
