'use strict';
var express = require('express');
var router = express.Router();

router.get('/additem', function(req, res) {
  res.render('additem', {
    title: 'List an Item'
  });
});

module.exports = router;
