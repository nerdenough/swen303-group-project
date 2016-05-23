'use strict';
var express = require('express');
var router = express.Router();

// Get: /
router.get('/', function(req, res) {
  console.log(req.session.user);
  res.render('index', {
    title: 'Home',
    app: req.config.app.title,
    user: req.session.user
  });
});

module.exports = router;
