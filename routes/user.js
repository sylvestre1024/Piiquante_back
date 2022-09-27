//route/user.js

// declaration du routeur
// d�claration des m�thodes d'itin�rances
// inclusion du/des middlewares Une s�rie de fonctions middleware (s�par�es par des virgules)
// d�claration des m�thodes
// Pour le routeur, m�thode type de requ�te avec en param�tres : URI, (n) middleware de service, � la fin la m�thode du service final) 

// External requires
const express = require("express");

// Creating express Router
const router = express.Router();

// Importing middleware
const passwordValidator = require("../middleware/validators/passwordValidator");
const emailValidator = require("../middleware/validators/emailValidator");

// Importing methods for sauce
const {signup} = require('../controllers/user/signup');
const {login} = require('../controllers/user/login');

// Routing for authentification
router.post('/signup', passwordValidator, emailValidator, signup);
router.post('/login', emailValidator, login);

module.exports = router;
