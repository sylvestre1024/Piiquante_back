// Model used
const Sauce = require("../../models/Sauce");

// Method for getting all the sauces
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