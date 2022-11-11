//models/sauce.js

// External requires
const mongoose = require("mongoose");

// Schema for a sauce using mongoose
// SchemaType est juste un objet de configuration pour Mongoose
// required: bool�en ou fonction, si vrai ajoute un validateur requis pour cette propri�t�
// default: toute fonction ou, d�finit une valeur par d�faut pour le chemin.
const sauceSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: Array, "default": [] },
    usersDisliked: { type: Array, "default": [] },
})

module.exports = mongoose.model("Sauce", sauceSchema);