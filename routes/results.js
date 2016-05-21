'use strict';
var express = require('express');
var router = express.Router();

router.get('/results', function(req, res) {

  var category = req.query.category;
  var sql = 'SELECT * FROM software WHERE category=?';

  req.db.query(sql, category, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.render('results', {
        title: 'SWEN303 Group Project',
        results: rows
      });
    }
  });

});

module.exports = router;
