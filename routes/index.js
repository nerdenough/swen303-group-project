'use strict';
var express = require('express');
var router = express.Router();

// Get: /
router.get('/', function(req, res) {
  res.render('index', {
    title: 'SWEN303 Project'
  });
});

module.exports = router;
