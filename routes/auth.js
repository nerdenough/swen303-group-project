'use strict';
var express = require('express');
var router = express.Router();

// Post: /login
router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email.length || !password.length) {
    return res.sendStatus(500);
  }

  var sql = 'SELECT password FROM users WHERE email=?';
  req.db.query(sql, email, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else if (!rows.length || rows[0].password !== password) {
      return res.json({error: 'Invalid Credentials'});
    }

    req.session.user = {
      email: rows[0].email,
      firstname: rows[0].firstname,
      lastname: rows[0].lastname
    };

    res.redirect('/');
  });
});

// Post: /register
router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var post = {
    email: email,
    password: password
  };

  var sql = 'SELECT email FROM users WHERE email=?';
  req.db.query(sql, email, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else if (rows.length) {
      return res.json({error: 'User Exists'});
    }

    sql = 'INSERT INTO users SET ?';
    req.db.query(sql, post, function(err, result) {
      if (err) {
        return res.sendStatus(500);
      }

      res.redirect('/hi');
    });
  });
});

module.exports = router;
