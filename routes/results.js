'use strict';
var express = require('express');
var router = express.Router();

router.get('/results', function(req, res) {

  var category = req.query.category;
  var sort = req.query.sort;
  console.log('SORT: '+sort);
  var sql = 'SELECT * FROM software WHERE category=?';

  if(sort==='lowtohigh'){
    sql += ' ORDER BY price ASC'
  }
  else if(sort==='hightolow'){
    sql += ' ORDER BY price DESC'
  }

  console.log("SQL: "+sql);
  req.db.query(sql, category, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else {

      res.render('results', {
        title: 'SWEN303 Group Project',
        category: category,
        results: rows
      });
    }
  });

});

module.exports = router;
