// contollers/sauce/read.js

// Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes 
// pour améliorer la maintenabilité de votre application.

// Model used
const Sauce = require("../../models/Sauce");

// Method for getting all the sauces
/*
* nous utilisons ensuite la méthode findOne() dans notre modèle lié
* pour trouver cet élément unique ayant le même _id que le paramètre de la requête;
* cet élément trouvé est ensuite retourné dans une Promise et envoyé au front-end;
* si aucun élément n'est trouvé ou si une erreur se produit, nous envoyons une erreur de status au front-end, 
 * avec l'erreur générée visible par l'utilisateur avec l'extension WebDevelopper, onglet Réseau, sous-onglet Aperçu ou Réponse
*/
exports.readSauces = async (req, res) => {
    try {
        //console.log("J\'utilise middleware readSauces !");
        // recherche dans la BDD le modèle Sauce
        const sauce = await Sauce.find({})
        res.status(200).json(sauce);
    } catch(err) {
        res.status(500).json({error : err})
    }
}

// Method for getting one sauce selected by Id
exports.readOneSauce = async (req, res) => {
    try {
        //console.log("J\'utilise middleware readOneSauce !");
        // recherche dans la BDD le modèle Sauce selon ces critères : l'id qui provient du paramètre de la requête
        //La fonction findById() est utilisée pour rechercher un seul document par son champ _id. 
        // Le champ _id est converti en fonction du schéma avant d'envoyer la commande.
        const sauce = await Sauce.findById({_id: req.params.id}).exec();
        res.status(200).json(sauce)
    } catch(err) {
        res.status(404).json({error: err})
    }
}
