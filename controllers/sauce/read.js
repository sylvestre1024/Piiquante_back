// contollers/sauce/read.js

// Un fichier de contr�leur exporte des m�thodes qui sont ensuite attribu�es aux routes 
// pour am�liorer la maintenabilit� de votre application.

// Model used
const Sauce = require("../../models/Sauce");

// Method for getting all the sauces
/*
* nous utilisons ensuite la m�thode findOne() dans notre mod�le li�
* pour trouver cet �l�ment unique ayant le m�me _id que le param�tre de la requ�te;
* cet �l�ment trouv� est ensuite retourn� dans une Promise et envoy� au front-end;
* si aucun �l�ment n'est trouv� ou si une erreur se produit, nous envoyons une erreur de status au front-end, 
 * avec l'erreur g�n�r�e visible par l'utilisateur avec l'extension WebDevelopper, onglet R�seau, sous-onglet Aper�u ou R�ponse
*/
exports.readSauces = async (req, res) => {
    try {
        //console.log("J\'utilise middleware readSauces !");
        // recherche dans la BDD le mod�le Sauce
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
        // recherche dans la BDD le mod�le Sauce selon ces crit�res : l'id qui provient du param�tre de la requ�te
        //La fonction findById() est utilis�e pour rechercher un seul document par son champ _id. 
        // Le champ _id est converti en fonction du sch�ma avant d'envoyer la commande.
        const sauce = await Sauce.findById({_id: req.params.id}).exec();
        res.status(200).json(sauce)
    } catch(err) {
        res.status(404).json({error: err})
    }
}
