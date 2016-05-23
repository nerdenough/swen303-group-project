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
          title: 'Checkout',
          app: req.config.app.title,
          user: req.session.user,
          addresslist: addresses,
          defaultAddress: defaultAddress[0],
          total: softwarePrice[0].sum,
        });

      });

    });

  });

});

// Post: /checkout
router.post('/checkout', function(req, res) {
  checkLogin(req, res);

  var data = req.body;
  var orders = {
    user_id: req.session.user.id,
    address_id: req.body.shippingAddress,
  }

  var orderSql = "INSERT INTO orders SET ?";
  req.db.query(orderSql, orders, function(err, orders) {
    if (err) {
      return res.sendStatus(500);
    }

    var order_id = orders.insertId;

    var softwareSql = "SELECT software_id FROM carts WHERE user_id = ?";
    var softwareParams = req.session.user.id;
    req.db.query(softwareSql, softwareParams, function(err, softwares) {
      if (err) {
        return res.sendStatus(500);
      }
      var orderSoftwareSql = "INSERT INTO order_software (order_id, software_id) VALUES ?";
      var orderSoftwareParams = [];

      for (var i = softwares.length - 1; i >= 0; i--) {

        orderSoftwareParams.push([
          order_id,
          softwares[i].software_id
        ]);
      };

      req.db.query(orderSoftwareSql, [orderSoftwareParams], function(err, orderSoftware) {
        if (err) {
          return res.sendStatus(500);
        }

        var cartSql = "DELETE FROM carts WHERE user_id = ?";
        var cartParams = req.session.user.id;
        req.db.query(cartSql, cartParams, function(err, result) {
          if (err) {
            return res.sendStatus(500);
          }

          return res.render('checkout/result', {
            title: 'Checkout',
            app: req.config.app.title,
            user: req.session.user,
            message: 'Order placed successfully',
          });

        });

      });

    });

  });

  return res.render('checkout/result', {
    title: 'Checkout',
    app: req.config.app.title,
    user: req.session.user,
    message: 'Sorry, please try again',
  });

});

module.exports = router;
