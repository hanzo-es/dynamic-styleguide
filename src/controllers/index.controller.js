const express = require('express');
const router = express.Router();
const folderStructure = require('../lib/folder-structure');
const { ui: uiProjectFolder} = require('../lib/project-folders');

const loadData = (req, res) => {
  const elements = folderStructure(uiProjectFolder, {deepLevel: 1});
  elements.children = elements.children.map(child => ({...child, isFirstLevel: true}));
  res.render('index', {elements});
};

router.get('/', loadData);

module.exports = router;
