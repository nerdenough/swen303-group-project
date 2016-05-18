'use strict';
var express = require('express');
var router = express.Router();

router.get('/browse', function(req, res) {
  res.render('browse', {
    title: 'SWEN303 Group Project'
  });
});

module.exports = router;
