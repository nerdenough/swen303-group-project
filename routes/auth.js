'use strict';
var express = require('express');
var router = express.Router();

// Get: /login
router.get('/login', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  }

  res.render('auth/login', {
    title: 'SWEN303 Project'
  });
});

// Get: /register
router.get('/register', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  }

  return res.render('auth/register', {
    title: 'SWEN303 Project'
  });
});

// GET: /logout
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.sendStatus(500);
    }

    res.redirect('/login');
  });
});

// Post: /login
router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email.length || !password.length) {
    return res.render('auth/login', {
      title: 'SWEN303 Project',
      error: 'No email or password specified'
    });
  }

  var sql = 'SELECT password FROM users WHERE email=?';
  req.db.query(sql, email, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else if (!rows.length || rows[0].password !== password) {
      return res.render('auth/login', {
        title: 'SWEN303 Project',
        error: 'Invalid email or password'
      });
    }

    req.session.user = {
      email: email
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

  if (!email.length || !password.length) {
    return res.render('auth/register', {
      title: 'SWEN303 Project',
      error: 'No email or password specified'
    });
  }

  var sql = 'SELECT email FROM users WHERE email=?';
  req.db.query(sql, email, function(err, rows) {
    if (err) {
      return res.sendStatus(500);
    } else if (rows.length) {
      return res.render('auth/register', {
        title: 'SWEN303 Project',
        error: 'An account already exists with this email address'
      });
    }

    sql = 'INSERT INTO users SET ?';
    req.db.query(sql, post, function(err, result) {
      if (err) {
        return res.sendStatus(500);
      }

      req.session.user = {
        email: email
      };

      res.redirect('/');
    });
  });
});

module.exports = router;
