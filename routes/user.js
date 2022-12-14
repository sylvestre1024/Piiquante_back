// External requires
const express = require("express");

// Creating express Router
const router = express.Router();

// Importing methods for sauce
const {signup} = require('../controllers/user/signup');
const {login} = require('../controllers/user/login');

// Routing for authentification
// routeur en action pour
// d?claration des m?thodes d'itin?rances
// inclusion du/des middlewares Une s?rie de fonctions middleware (s?par?es par des virgules)
// d?claration des m?thodes
// Pour le routeur, m?thode type de requ?te avec en param?tres : 
// URI, (n) middleware de service, ? la fin la m?thode du service final)
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;