'use strict';
var express = require('express');
var router = express.Router();

var catergory;


router.get('/browse', function(req, res) {
  res.render('browse', {
    title: 'SWEN303 Group Project'
  });
});

function setCategory(cat){
  catergory = cat;
}

module.exports = router;
