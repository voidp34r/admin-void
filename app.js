// Copyright 2015-2016, Google, Inc.
// [START app]
'use strict';

// [START setup]
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// development only

// var Mongoose = require('mongoose');
// var db = Mongoose.createConnection('mongodb://localhost:27017/local');
// var LinksSchema = require('./models/Link.js').LinksSchema;
// var Link = db.model('Link', LinksSchema, 'links');

// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function() {

// console.log('Estamos Conectado /,,,/');

// });

// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
 
// Connection URL 
// var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server 
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Conectado ao Mongo! :P veja esses dados:");
//   console.log("");
//   console.log(db);
//   db.close();
// });


// var MongoClient = require('mongodb').MongoClient
//       , assert = require('assert');
//     var url = 'mongodb://localhost:27017/test';
//     MongoClient.connect(url, function(err, db) {
//       assert.equal(null, err);
//       createCapped(db, function() {
//         db.close();
//       });
//     });

//     var createCapped = function(db, callback) {
//       db.createCollection("init1", { "capped": true, "size": 100000, "max": 5000},
//         function(err, results) {
//           console.log("Init1 Collection Criada!!! /,,,/");
//           callback();
//         }
//       );
//     };

var app = express();
app.enable('trust proxy');
// [END setup]

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/cmd', require('./routes/cmd'));
app.use('/cmdi', require('./routes/index'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  require('./routes/index');
  var err = new Error('Nâo achamos nada sobre sua requisão!!!');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// [END app]

module.exports = app;
