//models/sauce.js

// External requires
const mongoose = require("mongoose");

// Schema for a sauce using mongoose
const sauceSchema = mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    manufacturer: {
        type: String
    },
    description: {
        type: String
    },
    mainPepper: {
        type: String
    },
    imageUrl: {
        type: String
    },
    heat: {
        type: Number
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    usersLiked: {
        type: Array
    },
    usersDisliked: {
        type: Array
    },
});

module.exports = mongoose.model("Sauce", sauceSchema);
