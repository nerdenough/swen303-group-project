'use strict';
var express = require('express');
var router = express.Router();

// Get: /
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Hello, world!'
  });
});

module.exports = router;
