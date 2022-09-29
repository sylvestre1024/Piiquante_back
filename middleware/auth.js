//middleware/auth.js

/*
 * V�rifier que l�utilisateur est bien connect� 
 * et transmettre les informations de connexion 
 * aux diff�rentes m�thodes qui vont g�rer les requ�tes.
*/

// External requires
const jwt = require('jsonwebtoken')

// Method for checking Id using stored token
/*
�tant donn� que de nombreux probl�mes peuvent se produire, 
nous ins�rons tout � l'int�rieur d'un bloc try...catch.

Nous extrayons le token du header Authorization de la requ�te entrante. 
N'oubliez pas qu'il contiendra �galement le mot-cl� Bearer. 
Nous utilisons donc la fonction split pour tout r�cup�rer apr�s l'espace dans le header. 
Les erreurs g�n�r�es ici s'afficheront dans le bloc catch.

Nous utilisons ensuite la fonction verify pour d�coder notre token. 
Si celui-ci n'est pas valide, une erreur sera g�n�r�e.

Nous extrayons l'ID utilisateur de notre token et le rajoutons � l�objet Request 
afin que nos diff�rentes routes puissent l�exploiter.

Dans le cas contraire, tout fonctionne et notre utilisateur est authentifi�. 
Nous passons � l'ex�cution � l'aide de la fonction next().
*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // La m�thode verify() du package jsonwebtoken permet de v�rifier 
        // la validit� d'un token (sur une requ�te entrante, par exemple).
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valide";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requ�te non authentifi�e" });
    }
};
