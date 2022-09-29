// App.js pour déclarer le fonctionnement général 
// et les points d'accès liés aux méthodes d'itinérances

// External requires
const express = require("express");
const path = require("path");
const multer = require("multer");

// Security features
const mongoSanitize = require("express-mongo-sanitize"); // Helper to sanitize mongodb queries against query selector injections
const helmet = require("helmet"); // module that helps in securing HTTP headers
const dotenv = require("dotenv").config('./.env'); // cela permet de ranger nos variables d'environnement discrètement

// Connection to database MongoDB
const mongoose = require("./db/db");

// Routes used
// inclusion des méthodes d'itinérances
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Creating Express application
const app = express();

// Setting CORS headers
/* Ces headers permettent :
d'accéder à notre API depuis une oringine spécifique ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');  // same-origin pour le contraire
    next();
});

// request like Content-Type  application/json  and body to object req
app.use(express.json({ limit: "1mb" }));

// Using helmet to secure headers
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Prevention of NoSQL injection in Mongo
app.use(mongoSanitize());

// Use of routes
// app.use() pour spécifier le middleware comme fonction de rappel
// Monte la ou les fonctions middlewarepath spécifiées(*) sur le chemin spécifié
// (*) : pour nous, nos méthodes d'itinérances de type controlleur qui se base sur nos modèles de data Mongo
app.use('/images', express.static(path.join(__dirname, 'images'))); // chemin du serveur sur lequel notre point d'entrée 'images' pointera
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// Exporting app
module.exports = app;
