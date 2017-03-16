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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
[]
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

app.use(express.static(path.join(__dirname, 'public')));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var db = mongoose.connect('mongodb://voidp34r:akuma@ds145848.mlab.com:45848/voidpear', function(err) {
  if (err) {
    console.log(err.ok);
    console.log(err.code);
    console.log(err.errmsg);
    console.log('Não conseguimos conectar ao bando de dados MONGODB na máquina remota.');
  }
});

// var db_local = mongoose.connect('mongodb://localhost/test', function(err) {
//   console.log('Já que o banco de dados remoto não funciona vamos tentar com o local mesmo :P');
//   if (err) {
//     console.log('Não conseguimos conectar ao bando de dados MONGODB na máquina local.....');
//     console.log('Realmente temos um problema! :(');
//   } else {
//     console.log(':P Bando de dados local Conectado!');
//   }
// });
  
// console.log(db);


// Connect mongoose
// mongodb://USER:PASSWORD@localhost/DATABASE
// var db = mongoose.createConnection('mongodb://675769210965-compute@104.155.167.71:27017/test');
// mongoose.connect('mongodb://localhost/test', function(err) {
//   if (err) {
//     console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
//   }
// });

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
