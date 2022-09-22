//models/sauce.js

// External requires
const mongoose = require("mongoose");

// Schema for a sauce using mongoose
/*
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true, min: 1, max: 10, },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] },
});
*/


const sauceSchema = mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number, min: 1, max: 10 },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [String],
    usersDisliked: [String]
});

module.exports = mongoose.model("Sauce", sauceSchema);