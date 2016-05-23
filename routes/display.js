'use strict';
var express = require('express');
var router = express.Router();

router.get('/display', function(req, res) {

  var name = req.query.name;
  var category = req.query.category;

  var img = getImage(category);

  var sql = 'SELECT * FROM software WHERE name=?';
  console.log(img);
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

function getImage(cat){
  switch (cat) {
    case 'Business':
      return 'business img';
    case 'Development':
      return 'Development img';
    case 'Design':
      return 'Design img';
    case 'Education':
      return 'Education img';
    case 'Multimedia':
      return 'Multimedia img';
    case 'Utilities':
      return 'Utilities img';
  }
}

module.exports = router;
