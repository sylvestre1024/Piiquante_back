// Model used
const Sauce = require("../../models/Sauce");

// External requires
const fs = require("fs");


// Method for deleting a sauce
exports.deleteSauce = async (req, res) => {
    try {
    //console.log("J\'utilise middleware deleteSauce !");
    // The exec() method executes a search for a match in a specified string 
    // and returns a result array, or null.
    const sauce = await Sauce.findById({_id: req.params.id}).exec();
    const {userId, imageUrl} = sauce;
    if (!sauce) {
      return res.status(404).json({message: "Sauce non trouvée"})
    }
    if(userId !== req.auth.userId) {
      return res.status(401).json({message: "Requête non autorisée"})
    }
    const filename = imageUrl.split('/images/')[1];

     fs.unlink(`images/${filename}`, (err) => {});

    await Sauce.findByIdAndDelete({_id: req.params.id });
    res.status(200).json({message: "Sauce supprimée !"})

  } catch(err) {
      res.status(500).json({error: err})
    }
}


/*
 exports.deleteSauce = (req, res, next) => {

    // Recherche la sauce dans la base de données selon l'_id de la sauce 
     Sauce.findOne({ _id: req.params.id })
         .then(sauce => {

             // Recherche le fichier de l'image
             const filename = sauce.imageUrl.split('/images/')[1];

             // utilisation de file system pour supprimer l'image dans le dossier /images
             fs.unlink(`images/${filename}`, () => {

                 // Suppression de la Sauce dans la base de données
                 Sauce.deleteOne({ _id: req.params.id })
                     .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                     .catch(error => res.status(400).json({ error }));
             });
         })
         .catch(error => res.status(500).json({ error }));
}
 */