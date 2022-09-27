//route/sauce.js

// declaration du routeur
// déclaration des méthodes d'itinérances
// inclusion du/des middlewares
// déclaration des méthodes
// méthode type de requête avec en paramètres : URI, (n) middleware de service, à la fin la méthode du service final) 

// External requires
const express = require("express");

// Creating express Router
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
router.post("/", auth, multer, createSauce);
router.get("/", auth, readSauces);
router.get("/:id", auth, readOneSauce);
router.put("/:id", auth, multer, updateSauce);
router.delete("/:id", auth, deleteSauce);
router.post("/:id/like", auth, likeSauce);

module.exports = router;

