'use strict';
var express = require('express');
var router = express.Router();

// Helper function: Check user logged in
function checkLogin(req, res) {
  if(req.session.user === undefined) {
    return res.redirect('/login');
  }
}

// Get: /account
router.get('/account', function(req, res) {
  checkLogin(req, res);

  var userSql = "SELECT * FROM users WHERE id = ?";
  var userParams = req.session.user.id;
  req.db.query(userSql, userParams, function(err, userRows) {
    if (err) {
      return res.sendStatus(500);
    }

    var addressSql = "SELECT * FROM addresses WHERE user_id = ?";
    var addressParams = req.session.user.id;
    req.db.query(addressSql, addressParams, function(err, addressRows) {
      if (err) {
        return res.sendStatus(500);
      }

      res.render('account/index', {
        title: 'SWEN303 Project',
        user: userRows[0],
        addresses: addressRows,
      });

    });

  });

});

// GET: /account/updatePassword
router.get('/account/updatePassword', function(req, res) {
  checkLogin(req, res);
  res.render('account/updatePassword', {
    title: 'SWEN303 Project',
  });
});

// Post: /account/updatePassword
router.post('/account/updatePassword', function(req, res) {
  checkLogin(req, res);

  var userSql = "SELECT * FROM users WHERE id = ? AND password = ?";
  var userParams = [
    req.session.user.id,
    req.body.old_password,
  ];
  req.db.query(userSql, userParams, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    }

    if(!rows.length) {
      return res.render('account/updatePassword', {
        title: 'SWEN303 Project',
        error: 'Password does not match, please re-enter details',
      });
    }

    var updateSQL = "UPDATE users SET password = ? WHERE id = ?";
    var updateParams = [
      req.body.new_password,
      req.session.user.id,
    ];
    req.db.query(updateSQL, updateParams, function(err, addressRows) {
      if (err) {
        return res.sendStatus(500);
      }
      return res.redirect('/account');
    });

  });

});


// GET: /account/removeAddress
router.get('/account/removeAddress/:id', function(req, res) {
  checkLogin(req, res);

  var sql = "DELETE FROM addresses WHERE id = ? AND user_id = ?";
  var params = [
    req.params.id,
    req.session.user.id,
  ];
  req.db.query(sql, params, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }

    res.redirect('/account');
  });

});

// GET: /account/setDefaultAddress
router.get('/account/setDefaultAddress/:id', function(req, res) {
  checkLogin(req, res);

  var sql = "UPDATE addresses SET def = 0 WHERE user_id = ?";
  var params = req.session.user.id;
  req.db.query(sql, params, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }

    var updateSql = "UPDATE addresses SET def = 1 WHERE id = ? AND user_id = ?";
    var updateParams = [
      req.params.id,
      req.session.user.id,
    ];
    req.db.query(updateSql, updateParams, function(err, updateResult) {
      if (err) {
        return res.sendStatus(500);
      }

      res.redirect('/account');
    });

  });

});

// GET: /account/addAddress
router.get('/account/addAddress', function(req, res) {
  checkLogin(req, res);
  res.render('account/addAddress', {
    title: 'SWEN303 Project',
  });
});


// Post: /account/addAddress
router.post('/account/addAddress', function(req, res) {
  checkLogin(req, res);

  var sql = 'INSERT INTO addresses SET ?';
  var data = {
    user_id: req.session.user.id,
    attn: req.body.attn,
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    city: req.body.city,
    zip: req.body.zip,
  }

  if(req.body.def === 'on') {
    data.def = 1;
  }

  req.db.query(sql, data, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }

    if(req.body.def === 'on') {
      var updateSQL = "UPDATE addresses SET def = 0 WHERE user_id = ? AND id != ?";
      var updateParams = [
        req.session.user.id,
        result.insertId
      ];
      req.db.query(updateSQL, updateParams, function(err, defaultAddress) {
        if (err) {
          return res.sendStatus(500);
        }
        return res.redirect('/account');
      });
    }
    else {
      return res.redirect('/account');
    }

  });

});

module.exports = router;
