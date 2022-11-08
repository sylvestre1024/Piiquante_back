// Model used
const Sauce = require("../../models/Sauce");

/*
Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête 
sous la forme form-data et non sous forme de JSON. Le corps de la requête 
contient une chaîne de 'l'item', qui est simplement un 'objet item' converti en chaîne. 
Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.

Nous supprimons le champ_userId de la requête envoyée par le client car nous ne devons 
pas lui faire confiance (rien ne l’empêcherait de nous passer le userId d’une autre personne). 
Nous le remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.

Nous devons également résoudre l'URL complète de notre image, car req.file.filename 
ne contient que le segment filename. Nous utilisons req.protocol pour obtenir le premier segment 
(dans notre cas 'http'). Nous ajoutons '://', puis utilisons req.get('host') pour résoudre 
l'hôte du serveur (ici, 'localhost:3000'). Nous ajoutons finalement '/images/' et le nom de fichier 
pour compléter notre URL.*
 */

 
 /* 
 * @param {any} req
 * @param {any} res
 */

// Method for creating a new sauce
exports.createSauce = async (req, res) => {
    try {
        //console.log("J\'utilise middleware createSauce !");
        const sauceObject = JSON.parse(req.body.sauce);
        delete sauceObject._id;
        //The Object.create() method creates a new object, 
        // using an existing object as the prototype of the newly created object.
        await Sauce.create({
            userId: req.auth.userId, //We get the authenticated userId
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });
        res.status(201).json({ message: "Sauce créée !" })
        } catch(err) {
        res.status(400).json({ error : err })
    }
}