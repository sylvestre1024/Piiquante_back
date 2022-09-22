// Model used
const Sauce = require("../../models/Sauce");

// Method for creating a new sauce
exports.createSauce = async (req, res) => { // pas de next
    try {
        //console.log("J\'utilise middleware createSauce !");
        const sauceObject = JSON.parse(req.body.sauce);
        delete sauceObject._id;
        //delete sauceObject._userId; //Never trust a user
        //The Object.create() method creates a new object, 
        // using an existing object as the prototype of the newly created object.
        await Sauce.create({
        //userId: req.auth.userId, //We get the authenticated userId
        ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        res.status(201).json({message: "Sauce créée !"})
        } catch(err) {
        res.status(400).json({error : err})
    }
}
/*
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
*/