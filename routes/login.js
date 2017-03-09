// Copyright 2015-2016, Google, Inc.
'use strict';

var express = require('express');
var router = express.Router();

/* GET cmd listing. */
router.get('/', function (req, res) {
  res.render('login', {
    title: 'login'
  });
});
