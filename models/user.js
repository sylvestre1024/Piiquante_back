// External requires
const mongoose = require("mongoose");
/*
mongoose-unique-validator est un plugin qui ajoute une validation de pré-enregistrement 
pour les champs uniques dans un schéma Mongoose.
Cela facilite grandement la gestion des erreurs, 
car vous obtiendrez une erreur de validation Mongoose lorsque vous tenterez de violer une contrainte unique
*/
const uniqueValidator = require("mongoose-unique-validator");

// Schema for a user using mongoose
// S'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, 
// nous utiliserons le mot clé unique
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Verifying if unique with plugin
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
