// External requires
const express = require("express");
const path = require("path");
const multer = require("multer");

// Security features
//const mongoSanitize = require("express-mongo-sanitize");
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// request like Content-Type  application/json  and body to object req
app.use(express.json({ limit: "1mb" }));

// Prevention of NoSQL injection
//app.use(mongoSanitize());

// Use of routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// Exporting app
module.exports = app;
