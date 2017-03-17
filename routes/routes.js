var passport = require('passport');
var Account = require('../models/account');
var router = require('express').Router();
var debug = true;

router.get('/', function(req, res) {
  res.render('home', {user: req.user});
});

router.get('/admin', function(req, res) {
  if (req.user != null) {
    if (debug === true) { console.log(req, res); }
    res.render('admin', {user: req.user});
  } else {
    res.redirect('/loginadmin');
    // res.render('auth/login', {user: req.user});
  }
});

router.get('/register', function(req, res) {
  res.render('auth/register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('Error na tentativa de registo do usuário!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/loginadmin', function(req, res) {
  res.render('auth/loginadmin', {user: req.user});
});

router.post('/loginadmin', passport.authenticate('local'), function(req, res) {
  res.redirect('/admin');
});

router.get('/login', function(req, res) {
  res.render('auth/login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;