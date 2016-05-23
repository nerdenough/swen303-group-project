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
      title: 'SWEN303 Project',
      software: result,
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

// Get: /checkout
router.get('/cart/checkout', function(req, res) {
  checkLogin(req, res);

  var addressSql = "SELECT * FROM addresses where user_id = ?";
  var addressParams = req.session.user.id;
  req.db.query(addressSql, addressParams, function(err, addresses) {
    if (err) {
      return res.sendStatus(500);
    }

    var softwareSql = "SELECT SUM(software.price) AS sum FROM carts INNER JOIN software ON software.id = carts.software_id WHERE carts.user_id = ?";
    var softwareParams = req.session.user.id;
    req.db.query(softwareSql, softwareParams, function(err, softwarePrice) {
      if (err) {
        return res.sendStatus(500);
      }

      res.render('cart/checkout', {
        title: 'SWEN303 Project',
        addresslist: addresses,
        total: softwarePrice[0].sum,
      });

    });

  });

});

module.exports = router;
