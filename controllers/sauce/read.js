// contollers/sauce/read.js

// Un fichier de contreleur exporte des methodes qui sont ensuite attribuees aux routes 
// pour ameliorer la maintenabilite de votre application.

// Model used
const Sauce = require("../../models/Sauce");

// Method for getting all the sauces
/*
* nous utilisons ensuite la methode findOne() dans notre modele lie
* pour trouver cet element unique ayant le meme _id que le parametre de la requete;
* cet element trouve est ensuite retourne dans une Promise et envoye au front-end;
* si aucun element n'est trouve ou si une erreur se produit, nous envoyons une erreur de status au front-end, 
 * avec l'erreur generee visible par l'utilisateur avec l'extension WebDevelopper, onglet Reseau, sous-onglet Apercu ou Reponse
*/

exports.readSauces = async (req, res) => {
    try {
        //console.log("J\'utilise middleware readSauces !");
        // recherche dans la BDD le modele Sauce
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
        // recherche dans la BDD le modele Sauce selon ces criteres : l'id qui provient du parametre de la requete
        //La fonction findById() est utilisee pour rechercher un seul document par son champ _id. 
        // Le champ _id est converti en fonction du schema avant d'envoyer la commande.
        const sauce = await Sauce.findById({_id: req.params.id}).exec();
        res.status(200).json(sauce)
    } catch(err) {
        res.status(404).json({error: err})
    }
}

/*
//////////////////voir toute les sauces//////////////////////
exports.readSauces= (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json(sauces))
  .catch((error) => res.status(400).json({error: error}))
};
////////////////////////////détail 1 sauce//////////////////
exports.readOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error: error}))
};
*/
