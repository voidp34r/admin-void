'use strict';

var express = require('express');
var router = express.Router();

/* GET cmd listing. */
router.get('/', function (req, res) {
  res.render('cmd', {
    title: 'CMD'
  });
});

module.exports = router;