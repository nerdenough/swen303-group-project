'use strict';
var express = require('express');
var router = express.Router();

router.get('/results', function(req, res) {

  var category = req.query.category;
  var sort = req.query.sort;
  var search = req.query.search;


  var sql = 'SELECT * FROM software WHERE ';
  var query = '';

  if(category){
    query = "category='"+category+"'";
  } else if(search){
    query = "name LIKE '%"+search+"%'";
  }


  if(sort==='lowtohigh'){
    query += ' ORDER BY price ASC'
  }
  else if(sort==='hightolow'){
    query += ' ORDER BY price DESC'
  }


    sql+= query;

  console.log("SQL: "+sql);
  req.db.query(sql, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else {

      res.render('results', {
        title: 'SWEN303 Group Project',
        category: category,
        search: search,
        results: rows
      });
    }
  });

});

module.exports = router;
