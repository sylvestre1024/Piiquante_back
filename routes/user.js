//route/user.js

// declaration du routeur
// déclaration des méthodes d'itinérances
// inclusion du/des middlewares Une série de fonctions middleware (séparées par des virgules)
// déclaration des méthodes
// Pour le routeur, méthode type de requête avec en paramètres : URI, (n) middleware de service, à la fin la méthode du service final) 

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
