'use strict';
var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mysql = require('mysql');

// Custom routes
var index = require('./routes/index');
var auth = require('./routes/auth');
var browse = require('./routes/browse');
var results = require('./routes/results');
var listItem = require('./routes/listItem');

// Config
var config = require('./config');

// MySQL setup
var db = mysql.createConnection(config.mysql);

// Server setup
var app = express();
var server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'todo',
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// Global route
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// Define routes
app.use('/', index);
app.use('/', auth);
app.use('/', browse);
app.use('/', results);
app.use('/', listItem);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: ''
  });
});

server.listen(process.env.PORT || 3000);
module.exports = app;
