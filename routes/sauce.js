//route/sauce.js

// External requires
const express = require("express");

// Creating express Router
// permet de créer des routeurs séparés pour chaque route principale de votre application 
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
// déclaration des méthodes d'itinérances
// inclusion du/des middlewares Une série de fonctions middleware (séparées par des virgules)
// déclaration des méthodes
// Pour le routeur, méthode type de requête avec en paramètres : 
// URI, (n) middleware de service, à la fin la méthode du service final)
router.post("/", auth, multer, createSauce);
router.get("/", auth, readSauces);
router.get("/:id", auth, readOneSauce);
/*
 * Dans cette route :
* nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint
* nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible 
* en tant que paramètre
*/
router.put("/:id", auth, multer, updateSauce);
router.delete("/:id", auth, deleteSauce);
router.post("/:id/like", auth, likeSauce);

module.exports = router;

