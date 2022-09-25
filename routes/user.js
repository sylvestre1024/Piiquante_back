//route/user.js

const express = require('express');
const router = express.Router();

// Importing middleware
const passwordValidator = require("../middleware/validators/passwordValidator");
const emailValidator = require("../middleware/validators/emailValidator");

const userCtrlForSignup = require('../controllers/user/signup');
const userCtrlForlogin = require('../controllers/user/login');

router.post('/signup', passwordValidator, emailValidator, userCtrlForSignup.signup);
router.post('/login', emailValidator, userCtrlForlogin.login);

module.exports = router;
