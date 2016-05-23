'use strict';
var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/display', function(req, res) {

  var name = req.query.name;
  var category = req.query.category;

  var img = getImage(category);
  var sql = 'SELECT * FROM software WHERE name=?';
  
  req.db.query(sql, name, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.render('display', {
        title: config.app.title,
        app: config.app.title,
        item: rows,
        image: img
      });
    }
  });

});

function getImage(cat){
  switch (cat) {
    case 'Business':
      return 'http://icons.iconarchive.com/icons/walrick/openphone/256/Graph-icon.png';
    case 'Development':
      return 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Categories-applications-development-icon.png';
    case 'Design':
      return 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Apps-basket-icon.png';
    case 'Education':
      return 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Categories-applications-education-university-icon.png';
    case 'Multimedia':
      return 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Categories-applications-multimedia-icon.png';
    case 'Utilities':
      return 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Apps-preferences-desktop-user-password-icon.png';
  }
}

module.exports = router;
