var passport = require('passport');
var Account = require('../models/account');
var router = require('express').Router();
var debug = false;

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/admin', function(req, res) {
  if (req.user != null) {
    if (debug === true) { console.log(req, res); }
    res.render('pages/admin', {user: req.user});
  } else {
    res.render('./pages/login', {user: req.user});
  }
});

router.get('/register', function(req, res) {
  res.render('./partials/signup/register', {});
});

router.post('/register', function(req, res, next) {
  console.log('Registrando usuário');
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('Error na tentativa de registo do usuário!', err);
      return next(err);
    }

    console.log('usuário registrado!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('./partials/signup/login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;