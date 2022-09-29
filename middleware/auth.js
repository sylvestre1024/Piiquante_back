//middleware/auth.js

/*
 * Vérifier que l’utilisateur est bien connecté 
 * et transmettre les informations de connexion 
 * aux différentes méthodes qui vont gérer les requêtes.
*/

// External requires
const jwt = require('jsonwebtoken')

// Method for checking Id using stored token
/*
Étant donné que de nombreux problèmes peuvent se produire, 
nous insérons tout à l'intérieur d'un bloc try...catch.

Nous extrayons le token du header Authorization de la requête entrante. 
N'oubliez pas qu'il contiendra également le mot-clé Bearer. 
Nous utilisons donc la fonction split pour tout récupérer après l'espace dans le header. 
Les erreurs générées ici s'afficheront dans le bloc catch.

Nous utilisons ensuite la fonction verify pour décoder notre token. 
Si celui-ci n'est pas valide, une erreur sera générée.

Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request 
afin que nos différentes routes puissent l’exploiter.

Dans le cas contraire, tout fonctionne et notre utilisateur est authentifié. 
Nous passons à l'exécution à l'aide de la fonction next().
*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // La méthode verify() du package jsonwebtoken permet de vérifier 
        // la validité d'un token (sur une requête entrante, par exemple).
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valide";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée" });
    }
};
