'use strict';
var express = require('express');
var router = express.Router();

// Post: /auth/login
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

    // TODO: Set user session
    res.sendStatus(200);
  });
});

// Post: /auth/register
router.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var post = {
    email: email,
    password: password
  };

  // TODO: Validate email/passwords meet requirements

  var sql = 'SELECT email FROM users WHERE email=?';
  req.db.query(sql, email, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else if (rows.length) {
      return res.json({error: 'User Exists'});
    }

    console.log('INSERTING!');
    sql = 'INSERT INTO users SET ?';
    req.db.query(sql, post, function(err, result) {
      if (err) {
        return res.sendStatus(500);
      }

      // TODO: Set user session
      res.sendStatus(200);
    });
  });
});

module.exports = router;
