'use strict';
var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/listItem', function(req, res) {
  if(!req.session.user){
    res.redirect('/login');
  }
  res.render('listing/listItem', {
    title: config.app.title,
    app: config.app.title
  });
});

router.post('/listItem', function(req, res) {
  var message = 'Your item has been successfully listed. Well actually probably not.';

  // variables to store in database
  var name = req.body.name;
  var description = req.body.description;
  var publisher = req.body.publisher;
  var price = req.body.price;
  var category = req.body.category;

  if(!name.length || !description.length || !price.length){
    res.render('listing/listItem', {
      title: config.app.title,
      app: config.app.title,
      error: 'Please fill out all fields.'
      });

    return;
  }

  console.log("name: "+name+" description: "+description+" category: "+category);

  var post = {
    name: name,
    description: description,
    price: price,
    category: category
  };

  var sql = 'INSERT INTO software SET ?';

  req.db.query(sql, post, function(err, result) {
      if (!err) {
      	message =  'Your item has been successfully listed';
      	console.log("NO ERRORS BOIS");
      } else {
      	message = err;
      	console.log("BIG ERRORS BOIS");
      }
        res.render('listing/listConfirm', {
          title: config.app.title,
          app: config.app.title,
        	message: message
        	});
  });



});

module.exports = router;
