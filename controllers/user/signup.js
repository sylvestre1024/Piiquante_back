// External requires
// Utilisation d'un algorithme unidirectionnel pour chiffrer et créer un hash des mots de passe utilisateur, 
// que nous stockerons ensuite dans le document de la BDD
const bcrypt = require('bcrypt');
const cryptoJs = require("crypto-js");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const User = require('../../models/User');

// Creation schema passwordValidator
var schemaPASSW= new passwordValidator();
// Add properties to it
schemaPASSW
    .is().min(8)                                   // longueur mini
    .is().max(20)                                  // longueur max
    .has().uppercase(1)                            // min majuscule
    .has().lowercase(1)                            // min minuscule
    .has().digits(1)                               // min nombre
    .has().not().spaces()                          // pas d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Azerty1', 'Azerty2']); // entrées non valides

/* Le res objet représente la réponse HTTP qu'une application Express envoie lorsqu'elle reçoit une requête HTTP.
*  Dans cette documentation et par convention, l'objet est toujours appelé res (et la requête HTTP est req) 
*  next, indiquant la prochaine fonction middleware
*/

exports.signup = (req, res, next) => {
    const emailCrypt = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_SECRET_KEY}`).toString();//crypt email

    if (!emailValidator.validate(req.body.email)) {
        throw "Adresse email invalide !" // throw pour envoyer dans la console node.js
    } else if (!schemaPASSW.validate(req.body.password)) {
        throw "Mot de passe invalide !"
    } else {
    /*
     * la fonction de hachage de bcrypt pour le mot de passe rajoute une demande de « saler » le mot de passe 10 fois.
     * Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé.
     */

    const saltRounds = 10;
    bcrypt
        // demande de hash et passe en paramètre le mot de passe du corps de la requête utilisateur et hache n fois
        .hash(req.body.password, saltRounds)
        /*
         * il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
         * dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données,
         * en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec.
         */
        .then(hash => {
            const user = new User({
                email: emailCrypt,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };
};