'use strict';
var express = require('express');
var router = express.Router();

// Helper function: Check user logged in
function checkLogin(req, res) {
  if(req.session.user === undefined) {
    return res.redirect('/login');
  }
}

// Get: /checkout
router.get('/checkout', function(req, res) {
  checkLogin(req, res);

  var addressSql = "SELECT * FROM addresses where user_id = ? AND def = 0";
  var addressParams = req.session.user.id;
  req.db.query(addressSql, addressParams, function(err, addresses) {
    if (err) {
      return res.sendStatus(500);
    }

    var defaultAddressSql = "SELECT * FROM addresses where user_id = ? AND def = 1";
    var defaultAddressParams = req.session.user.id;
    req.db.query(defaultAddressSql, defaultAddressParams, function(err, defaultAddress) {
      if (err) {
        return res.sendStatus(500);
      }

      var softwareSql = "SELECT SUM(software.price) AS sum FROM carts INNER JOIN software ON software.id = carts.software_id WHERE carts.user_id = ?";
      var softwareParams = req.session.user.id;
      req.db.query(softwareSql, softwareParams, function(err, softwarePrice) {
        if (err) {
          return res.sendStatus(500);
        }

        res.render('checkout/checkout', {
          title: 'SWEN303 Project',
          addresslist: addresses,
          defaultAddress: defaultAddress[0],
          total: softwarePrice[0].sum,
        });

      });

    });

  });

});

module.exports = router;
