//route/user.js

const express = require('express');
const router = express.Router();

const userCtrlForSignup = require('../controllers/user/signup');
const userCtrlForlogin = require('../controllers/user/login');

router.post('/signup', userCtrlForSignup.signup);
router.post('/login', userCtrlForlogin.login);

module.exports = router;