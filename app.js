// External requires
const express = require("express");
const path = require("path");
const multer = require("multer");

// Security features
const mongoSanitize = require("express-mongo-sanitize"); // Helper to sanitize mongodb queries against query selector injections
const helmet = require("helmet"); // module that helps in securing HTTP headers
const dotenv = require("dotenv").config('./.env');

// Connection to database MongoDB
const mongoose = require("./db/db");

// Routes used
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Creating Express application
const app = express();

// Setting CORS headers
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
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// request like Content-Type  application/json  and body to object req
app.use(express.json({ limit: "1mb" }));

// Using helmet to secure headers
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Prevention of NoSQL injection
app.use(mongoSanitize());

// Use of routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// Exporting app
module.exports = app;
