//route/sauce.js

// External requires
const express = require("express");

// Creating express Router
// permet de cr�er des routeurs s�par�s pour chaque route principale de votre application � 
// vous y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Importing middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Importing methods for sauce
const {createSauce} = require("../controllers/sauce/create");
const {readSauces, readOneSauce} = require("../controllers/sauce/read");
const {updateSauce} = require("../controllers/sauce/update");
const {deleteSauce} = require("../controllers/sauce/delete");
const {likeSauce} = require("../controllers/sauce/likes/like");

// Routing for sauces
// routeur en action pour
// d�claration des m�thodes d'itin�rances
// inclusion du/des middlewares Une s�rie de fonctions middleware (s�par�es par des virgules)
// d�claration des m�thodes
// Pour le routeur, m�thode type de requ�te avec en param�tres : 
// URI, (n) middleware de service, � la fin la m�thode du service final)
router.post("/", auth, multer, createSauce);
router.get("/", auth, readSauces);
router.get("/:id", auth, readOneSauce);
/*
 * Dans cette route :
* nous utilisons la m�thode get() pour r�pondre uniquement aux demandes GET � cet endpoint
* nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible 
* en tant que param�tre
*/
router.put("/:id", auth, multer, updateSauce);
router.delete("/:id", auth, deleteSauce);
router.post("/:id/like", auth, likeSauce);

module.exports = router;

