'use strict';
var express = require('express');
var router = express.Router();

// Helper function: Check user logged in
function checkLogin(req, res) {
  if(req.session.user === undefined) {
    return res.redirect('/login');
  }
}

// Get: /cart
router.get('/cart', function(req, res) {
  checkLogin(req, res);

  var sql = 'SELECT * FROM software WHERE software.id IN (SELECT software_id FROM carts WHERE carts.user_id = ?)';
  var params = req.session.user.id;
  req.db.query(sql, params, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    res.render('cart/view', {
      title: 'My Cart',
      app: req.config.app.title,
      software: result,
      user: req.session.user,
    });
  });

});

// Get: /cart/remove/id
router.get('/cart/remove/:id', function(req, res) {
  checkLogin(req, res);

  var sql = "DELETE FROM carts WHERE id = ? AND user_id = ?";
  var params = [
    req.params.id,
    req.session.user.id,
  ];
  req.db.query(sql, params, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    res.redirect('/cart');
  });

});

// Get: /cart/add/id
router.get('/cart/add/:id', function(req, res) {
  checkLogin(req, res);

  var sql = "INSERT INTO carts SET ?";
  var params = {
    user_id: req.session.user.id,
    software_id: req.params.id,
  };
  req.db.query(sql, params, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    res.redirect('/cart');
  });

});

module.exports = router;
