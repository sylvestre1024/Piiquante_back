// Model used
const Sauce = require("../../models/Sauce");

// External requires
const fs = require('fs');
const jwt = require('jsonwebtoken');

// "req.auth.userId" nous permet de comparer la valeur du jeton préalablement décodé
// à chaque requête de l'utilisateur avec l'information issue de la requête du client "sauce.userId"

exports.updateSauce = (req, res, next) => {
    if (req.file) { // modification de l'image, suppression de l'ancienne image sur le serveur dans /images
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (req.auth.userId !== sauce.userId) {
                    return res.status(403).json({ message: "Requête non autorisée" })
                }
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject =
                    {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée avec image !' }))
                        //.catch(error => res.status(400).json({ error }))
                        .catch(error => {
                            console.log('DATABASE_ERROR_NB_[' + error.statusCode + '] for update entry with data');
                            res.status(400).json({ error });
                        });
                });
            });
    } else { // Si l'image n'est pas modifée
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {//verification de l'appartenance de la sauce à l'utilisateur
                if (req.auth.userId !== sauce.userId) {
                    return res.status(403).json({ message: "Requête non autorisée" })
                }
                const sauceObject = { ...req.body }
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Sauce modifiée !' }))
                    //.catch(error => res.status(400).json({ error }))
                    .catch(error => {
                        console.log('DATABASE_ERROR_NB_[' + error.statusCode + '] for update entry');
                        res.status(400).json({ error });
                    });
            })
    }
};