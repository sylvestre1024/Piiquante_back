// Model used
const Sauce = require("../../models/Sauce");

/* Dans cette version modifiée de la fonction, on crée un objet 'item' qui regarde si req.file 
 * existe ou non. S'il existe, on traite la nouvelle image ; 
 * s'il n'existe pas, on traite simplement l'objet entrant. 
 * On crée ensuite une instance 'Item' à partir de 'item object', 
 * puis on effectue la modification. Nous avons auparavant, comme pour la route POST, 
 * supprimé le champ _userId envoyé par le client afin d’éviter de changer son propriétaire 
 * et nous avons vérifié que le requérant est bien le propriétaire de l’objet.
 */

// External requires
const fs = require("fs");
// req.auth.userId
// ...JSON.parse(req.body.sauce),

// Method for modifying an existing sauce
exports.updateSauce = async (req, res) => {
  try {
// destructuring req.body
    const {name, manufacturer, description, mainPepper, heat, userId} = req.body;

     // Check if file is updated and delete old one if existing
    if(req.file) {
      const sauce = await Sauce.findById({_id: req.params.id}).exec();
      const {imageUrl} = sauce
      const filename = imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {})
    }

    // Populate new object with new image / new datas
    const sauceObject = req.file
      ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
      : {
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        heat: heat,
        userId: userId,
      };

// Update sauce data or image
    await Sauce.findByIdAndUpdate({_id: req.params.id}, {
      ...sauceObject,
      _id: req.params.id,
    })
    res.status(200).json({message: "Sauce modifiéé !"})

} catch(error) {
  res.status(400).json({error})
}
}

/*
  exports.updateSauce = (req, res, next) => {
    if (req.file) {

        // Recherche la sauce dans la base de données selon l'_id de la sauce 
        Sauce.findOne({ 
            _id: req.params.id 
        })
        .then(sauce => {

                // si l'image est modifiée, supprime l'ancienne image dans le dossier /images
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {

                    // une fois l'ancienne image supprimée, mise à jour
                    const sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }

                    // sauvegarde la mise à jour
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // si l'image n'est pas modifiée
        const sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};
*/