'use strict';

const express = require('express');

const router = express.Router();


// Renders the home page
router.get('/', (req, res) => {
  res.render('home');
});

router.post('/register', (res) => {
  res.statusCode = 201;
});

router.post('/login', (res) => {
  res.statusCode = 202;
});

router.get('/product', (res) => {
  res.statusCode = 200;
});

module.exports = router;
