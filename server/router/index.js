'use strict';

let express = require('express');
let homeRoutes = require('./home');
let secretsRoutes = require('./secrets');
let loginRoutes = require('./login');
let logoutRoutes = require('./logout');
let registerRoutes = require('./register');

let router = express.Router();


router.get('/', homeRoutes.get);
router.get('/secrets', secretsRoutes.get);
router.get('/login', loginRoutes.get);
router.post('/login', loginRoutes.post);
router.get('/logout', logoutRoutes.get);
router.get('/register', registerRoutes.get);
router.post('/register', registerRoutes.post);


module.exports = router;
