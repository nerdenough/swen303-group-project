'use strict';
var express = require('express');
var router = express.Router();

// Get: /
router.get('/', function(req, res) {
  var featuredSql = 'SELECT * FROM software LIMIT 4';
  var latestSql = 'SELECT * FROM software ORDER BY id DESC LIMIT 4';

  var featuredRows = [];
  var latestRows = [];

  req.db.query(featuredSql, function(err, rows) {
    if (err) {
      return res.status(500);
    }
    featuredRows = rows;

    req.db.query(latestSql, function(err1, rows1) {
      if (err1) {
        return res.status(500);
      }
      latestRows = rows1;

      res.render('index', {
        title: 'Home',
        app: req.config.app.title,
        user: req.session.user,
        featured: featuredRows,
        latest: latestRows
      });
    });
  });
});

module.exports = router;
