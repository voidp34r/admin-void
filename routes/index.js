// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var express = require('express');
var router = express.Router();

// [START index]
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Horizonte de eventos.'
  });
});
// [END index]

/* GET cmd listing. */
router.get('/cmd', function (req, res) {
  res.render('cmd', {
    title: 'CMD'
  });
});

/* GET login listing. */
router.get('/login', function (req, res) {
  res.render('login', {
    title: 'login'
  });
});

router.get('/register', function (req, res) {
  res.render('register', {
    title: 'register'
  });
});

router.get(function (req, res) {
  res.render('error', {
    title: 'error'
  });
});


module.exports = router;