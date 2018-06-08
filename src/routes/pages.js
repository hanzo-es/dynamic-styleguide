const express = require('express');
const router = express.Router({strict: true});

const PagesController = require('../controllers/pages.controller');

router.use('/*', PagesController );

module.exports = router;
