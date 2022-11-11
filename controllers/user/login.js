// External requires
/*
*  Fonction login pour vérifier les informations d'identification des utilisateurs 
*  pour leur permettre de se connecter
*  Méthode permettant de vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides.
*/

// Utilisation d'un hash avec le mot de passe rentré, puis comparaison à la BDD, les hash ne seront pas les mêmes
// mais bien distinguer par Bcrypt au final
const bcrypt = require('bcrypt');

const cryptoJs = require("crypto-js");
/*
 * Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois à leur compte. 
 * Au moment de se connecter, ils recevront leur token et le renverront automatiquement à chaque requête par la suite.
 * Ceci permettra au back-end de vérifier que la requête est authentifiée
 * Pour pouvoir créer et vérifier les tokens d'authentification, il nous faudra le package 'jsonwebtoken'
*/
const jwt = require('jsonwebtoken');

// Model used
const User = require('../../models/User');

/*
* La méthode "compare de bcrypt" compare un string (le mot de passe) entré par l'utilisateur avec le hash enregistré dans la BDD :
* S'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized avec le même message 
* que lorsque l’utilisateur n’a pas été trouvé, afin de ne pas laisser quelqu’un vérifier 
* si une autre personne est inscrite sur notre site.
* S'ils correspondent, les informations d'identification de notre utilisateur sont valides. 
* Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. 
* Ce token est une chaîne générique qui est par la suite modifié et le crypté
 * 
 * Les jetons Web JSON sont une méthode RFC 7519 ouverte et standard de l'industrie 
 * pour représenter les revendications en toute sécurité entre deux parties.
*  JWT.IO vous permet de décoder, vérifier et générer JWT.
*/

/*
* La méthode "compare de bcrypt" montre que même bcrypt ne peut pas décrypter ses propres hashs.
*/
exports.login = (req, res, next) => {
    const emailCrypt = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_SECRET_KEY}`).toString();//crypte l'email
    User.findOne({ email: emailCrypt })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    /*
                    Nous utilisons la fonction sign de jsonwebtoken pour chiffrer un nouveau token.

                    Ce token contient l'ID de l'utilisateur en tant que payload 
                    (les données encodées dans le token).

                    Nous utilisons une chaîne secrète de développement temporaire 
                    RANDOM_SECRET_KEY pour crypter notre token 
                    (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production).
                    Puisque cette chaîne sert de clé pour le chiffrement et le déchiffrement du token,
                    elle doit être difficile à deviner, sinon n’importe qui pourrait générer 
                    un token en se faisant passer pour notre serveur.

                    Nous définissons la durée de validité du token à 24 heures.
                    L'utilisateur devra donc se reconnecter au bout de 24 heures.

                    Nous renvoyons le token au front-end avec notre réponse.

                    Vous pouvez désormais utiliser l'onglet « Réseau » de Chrome DevTools pour vérifier
                    qu’une fois l’utilisateur connecté, chaque requête provenant du front-end 
                    contient bien un en-tête « Authorization »
                    avec le mot-clé « Bearer » et une longue chaîne chiffrée. Il s'agit de notre token !
                    */
                    //Nous renvoyons le token au front-end avec notre réponse.
                    res.status(200).json({//si correspondance, les informations d'identification utilisateur sont valides. Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token.
                        userId: user._id,
                        // creation du token
                        token: jwt.sign(//la fonction sign de jsonwebtoken pour chiffrer un nouveau token.Ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token).
                            { userId: user._id },
                            `${process.env.JWT_TOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};