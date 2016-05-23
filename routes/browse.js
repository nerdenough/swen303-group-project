'use strict';
var express = require('express');
var router = express.Router();
var config = require('../config');

var catergory;


router.get('/browse', function(req, res) {
  res.render('browse', {
    title: 'Browse',
    app: config.app.title
  });
});

function setCategory(cat){
  catergory = cat;
}

module.exports = router;
