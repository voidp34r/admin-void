// Copyright 2015-2016, Google, Inc.
'use strict';

var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

// [START index]
router.get('/', function (req, res) {
  res.render('index', {
    user : req.user
  });
});
// [END index]

router.get('/register', function (req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

/* GET cmd listing. */
router.get('/cmd', function (req, res) {
  res.render('cmd', {
    title: 'CMD'
  });
});

/* GET login listing. */
router.get('/login', function (req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get(function (req, res) {
  res.render('error', {
    title: 'error'
  });
});

router.get('/demo', function (req, res) {
  res.render('demo', {
    title: 'demo'
  });
});

module.exports = router;