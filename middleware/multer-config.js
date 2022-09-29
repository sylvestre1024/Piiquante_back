/*
Nous cr�ons une constante storage , � passer � multer comme configuration, 
qui contient la logique n�cessaire pour indiquer � multer o� enregistrer les fichiers entrants :

la fonction destination indique � multer d'enregistrer les fichiers dans le dossier images ;

la fonction filename indique � multer d'utiliser le nom d'origine, 
de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier. 
Elle utilise ensuite la constante dictionnaire de type MIME pour r�soudre l'extension de fichier appropri�e.

Nous exportons ensuite l'�l�ment multer enti�rement configur�, 
lui passons notre constante storage et lui indiquons que nous g�rerons 
uniquement les t�l�chargements de fichiers image.
*/

const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

/*
multer est un package de gestion de fichiers.

Sa m�thode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.

Sa m�thode single()  cr�e un middleware qui capture les fichiers d'un certain type (pass� en argument), 
et les enregistre au syst�me de fichiers du serveur � l'aide du storage configur�.
*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

module.exports = multer({ storage }).single("image");
