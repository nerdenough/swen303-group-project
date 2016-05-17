'use strict';
var express = require('express');
var router = express.Router();

router.get('/listItem', function(req, res) {
  res.render('listing/listItem', {
    title: 'SWEN303 Project'
  });
});

router.post('/listItem', function(req, res) {
  var message = 'Your item has been successfully listed. Well actually probably not.';

  // variables to store in database
  var name = req.body.name;
  var description = req.body.description;
  var publisher = req.body.publisher;
  var price = req.body.price;

  var post = {
    name: name,
    description: description,
    price: price
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
        	title: 'SWEN 303 Project',
        	message: message
        	});
  });



});

module.exports = router;
