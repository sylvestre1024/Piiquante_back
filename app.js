
// App.js pour d�clarer le fonctionnement g�n�ral
// et les points d'acc�s li�s aux m�thodes d'itin�rances

// External requires
const express = require("express");
const path = require("path");
//const multer = require("multer");

// Security features
const mongoSanitize = require("express-mongo-sanitize"); // Helper to sanitize mongodb queries against query selector injections
const helmet = require("helmet"); // module that helps in securing HTTP headers
const dotenv = require("dotenv").config('./.env'); // cela permet de ranger nos variables d'environnement discr�tement

// Connection to database MongoDB
const mongoose = require("./db/db");

// Routes used
// inclusion des m�thodes d'itin�rances
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Log features
const morgan = require("morgan");

// Creating Express application
const app = express();

// Creating log for errors
app.use(morgan("dev"));

// Setting CORS headers
/* Ces headers permettent :
d'acc�der � notre API depuis une oringine sp�cifique ;
d'ajouter les headers mentionn�s aux requ�tes envoy�es vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requ�tes avec les m�thodes mentionn�es ( GET ,POST , etc.).
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
// app.use() pour sp�cifier le middleware comme fonction de rappel
// Monte la ou les fonctions middlewarepath sp�cifi�es(*) sur le chemin sp�cifi�
// (*) : pour nous, nos m�thodes d'itin�rances de type controlleur qui se base sur nos mod�les de data Mongo

app.use('/images', express.static(path.join(__dirname, 'images'))); // chemin du serveur sur lequel notre point d'entr�e 'images' pointera
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// Exporting app
module.exports = app;