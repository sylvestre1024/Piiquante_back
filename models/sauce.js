// External requires
const mongoose = require("mongoose");
const MongooseErrors = require('mongoose-errors')

// Schema for a sauce using mongoose
// SchemaType est juste un objet de configuration pour Mongoose
// required: booléen ou fonction, si vrai ajoute un validateur requis pour cette propriété
// default: toute fonction ou, définit une valeur par défaut pour le chemin.

var sauceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true, min: 1, max: 10 },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true }
}, { emitIndexErrors: true });

sauceSchema.plugin(MongooseErrors);

module.exports = mongoose.model("Sauce", sauceSchema);