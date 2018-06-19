const express = require('express');
const router = express.Router();
const { getIndexTree } = require('../lib/sidebar-tree');

const loadData = (req, res) => {
  const elements = getIndexTree();
  res.render('index', {elements});
};

router.get('/', loadData);

module.exports = router;
