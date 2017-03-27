var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rdb = require('rethinkdb');
var r = require('rethinkdbdash')();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));
app.use(express.static(path.join(__dirname, 'public')));

// Configure db (MongoDB) for authentication
// var db = require('./config/dbMongo');

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var passport_local = require('./config/passport_local');

// Configure db (rehtinDb) for authentication
// var record = require('./config/rethinkdb');

//DeepStream
var deepstream = require('deepstream.io-client-js');
//Conecting model client for Deepstream
var client = require('./config/deepstream');

// Register routes
app.use('/', require('./routes/routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
