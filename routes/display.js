'use strict';
var express = require('express');
var router = express.Router();

router.get('/display', function(req, res) {

  var name = req.query.name;
  var sql = 'SELECT * FROM software WHERE name=?';

  req.db.query(sql, name, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.render('display', {
        title: 'SWEN303 Group Project',
        item: rows
      });
    }
  });

});

module.exports = router;
