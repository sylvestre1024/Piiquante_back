// Model used
const Sauce = require("../../../models/Sauce");
/*
exports.likeSauce = async (req, res) => {
    try {
        // Destructuring
        const { like } = req.body.like;
        const { userId } = req.body.userId;
        // get the authenticated userId
        //if (userId !== req.auth.userId) {
            //res.status(401).json({ message: 'Not authorized' });
        //} else {

            // Find sauce that needs to be updated
            const sauce = await Sauce.findById({ _id: req.params.id })
            // Using switch to handle all the cases
            switch (req.body.like) {
                // If like === 1
                case 1:
                    // Si notre resultat de recherche dans la BDD, ne correspond PAS a l'utilisateur
                    // cet utilisateur different a le droit de liker
                    // The includes() method returns true if a string contains a specified string
                    if (!sauce.usersLiked.includes(userId)) {
                        // action de mise a jour dans la BDD, 
                        // // Operator "$inc" will increment a value to an existing data
                        // The operator "$push" will add a data to an existing array
                        //console.log("Adding like !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } })
                        res.status(200).json({ message: "Je like cette sauce" })
                    }
                    break;
                // If like === 0
                // Si notre resultat de recherche dans la BDD, correspond BIEN a l'utilisateur
                // cas d'une action de Liked
                case 0:
                    if (sauce.usersLiked.includes(userId)) {
                        //console.log("Removing like !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                        res.status(200).json({ message: "Je retire mon like" })
                    }
                    // cas d'une action de Disliked
                    if (sauce.usersDisliked.includes(userId)) {
                        //console.log("Removing disliked !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                        res.status(200).json({ message: "Je retire mon dislike" })
                    }
                    break;
                // If like === -1
                // Si notre resultat de recherche dans la BDD, ne correspond PAS a l'utilisateur
                // pour lequel il y a une demande de Disliked
                // alors il a le droit de Disliked
                case -1:
                    if (!sauce.usersDisliked.includes(userId)) {
                        //console.log("Adding disliked !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } })
                        res.status(200).json({ message: "Je dislike cette sauce" })
                    }
            break;
    }

  } catch(err) {
    res.status(400).json({error: err})
  }
}
*/

/*
exports.likeSauce = async (req, res) => {
     switch (req.body.like) {
         
         // Si l'utilisateur supprime son opinion
         case 0: 

             // Recherche la sauce dans la base de données selon l'_id de la sauce 
             Sauce.findOne({ _id: req.params.id })
                 .then((sauce) => {

                     // Si l'utilisateur avait liké la Sauce
                     if (sauce.usersLiked.find(user => user === req.body.userId)) {
                         Sauce.updateOne({ _id: req.params.id }, {

                                 // utilisations des variables $inc et $pull de mongodb pour mettre à jour
                                 // Décrémenter de 1 les likes
                                 $inc: { likes: -1 }, 

                                 // Retirer l'ID de l'utilisateur du tableau des liked
                                 $pull: { usersLiked: req.body.userId }, 
                                 _id: req.params.id
                             })
                             .then(() => res.status(201).json({ message: 'Ton avis a été pris en compte!' }))
                             .catch(error => res.status(400).json({ error }));
                     }

                     // Si l'utilisateur avait disliké la Sauce
                     if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                         Sauce.updateOne({ _id: req.params.id }, {

                                 // utilisations des variables $inc et $pull de mongodb pour mettre à jour
                                 // Décrémenter de 1 les dislikes
                                 $inc: { dislikes: -1 }, 

                                 // Retirer l'ID de l'utilisateur du tableau des disliked
                                 $pull: { usersDisliked: req.body.userId }, 
                                 _id: req.params.id
                             })
                             .then(() => res.status(201).json({ message: 'Ton avis a été pris en compte!' }))
                             .catch(error => res.status(400).json({ error }));
                     }
                 })
                 .catch(error => res.status(404).json({ error }));
             break;

         // Si l'utilisateur like la Sauce
         case 1: 
                 // met à jour la sauce dans la base de données selon l'_id de la sauce 
                 Sauce.updateOne({ _id: req.params.id }, {

                     // utilisations des variables $inc et $push de mongodb pour mettre à jour
                     // Incrémenter de 1 les likes
                     $inc: { likes: 1 },

                     // Ajouter l'ID de l'utilisateur au tableau des liked
                     $push: { usersLiked: req.body.userId },
                     _id: req.params.id
                 })
                     .then(() => res.status(201).json({ message: 'Ton like a été pris en compte !' }))
                     .catch((error) => res.status(400).json({ error }));
             break;

         // Si l'utilisateur dislike la Sauce
         case -1: 

             // met à jour la sauce dans la base de données selon l'_id de la sauce 
             Sauce.updateOne({ _id: req.params.id }, {
                
                     // utilisations des variables $inc et $push de mongodb pour mettre à jour
                     // Incrémenter de 1 les disliked
                     $inc: { dislikes: 1 }, 

                     // Ajouter l'ID de l'utilisateur au tableau des disliked
                     $push: { usersDisliked: req.body.userId }, 
                     _id: req.params.id
                 })
                 .then(() => res.status(201).json({ message: 'Ton dislike a été pris en compte !' }))
                 .catch((error) => res.status(400).json({ error }));
             break;

         // Si la valeur attendu n'est pas correcte
         default: 
         console.error('Cette valeur n\'est pas valide !');
     }
 
 }
 */

 exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;//on accède à l'user qui a aimé
    const like = req.body.like;//on accede au corps rêq de like
    const sauceId = req.params.id;//on accède à l'id de la sauce
 
    Sauce.findOne({_id : sauceId})//Renvoie un document qui satisfait les critères de requête spécifiés sur la collection ou la vue
    .then((sauce) => {

      // like = 1 (likes +1 )
      if(!sauce.usersLiked.includes(userId) && like === 1){//true cherche dans userLiked le tableau si userId de la pers qui vote est présent quand il fait un like 
        Sauce.updateOne({_id : sauceId},//mets à jour l'User en incluant l'id
          {
            $inc: {likes: 1},//$inc Incrémente la valeur du champ du montant spécifié.
            $push: {usersLiked: userId}  //$push Ajoute un élément à un tableau.
          }
          )
          .then(() => res.status(201).json({message: "User like +1"}))
          .catch((error) => res.status(400).json({error}));
      };
      //like = 0 (likes = 0)
      if(sauce.usersLiked.includes(userId) && like === 0){
        Sauce.updateOne({_id : sauceId},
          {
            $inc: {likes: -1},//$inc opérateur mongoDB incrémente
            $pull: {usersLiked: userId}  //$pull Supprime tous les éléments du tableau qui correspondent à une requête spécifiée.
          }
          )
          .then(() => res.status(201).json({message: "User like 0"}))
          .catch((error) => res.status(400).json({error}));
      };

      //like -1 (dislikes +1)
      if(!sauce.usersDisliked.includes(userId) && like === -1){// cherche dans userDisliked si l'userId est présent quand il appuie sur dislike
        Sauce.updateOne({_id : sauceId},
          {
            $inc: {dislikes: 1},
            $push: {usersDisliked: userId}
          }
          )
          .then(() => res.status(201).json({message: "User disLike +1"}))
          .catch((error) => res.status(400).json({error}));
      };

      // like = 0 pas de vote
      if(sauce.usersDisliked.includes(userId) && like === 0){
        Sauce.updateOne({_id : sauceId},
          {
            $inc: {dislikes: -1},
            $pull: {usersDisliked: userId}  
          }
          )
          .then(() => res.status(201).json({message: "User disLike +1"}))
          .catch((error) => res.status(400).json({error}));
      };
})      
  .catch((error) => res.status(404).json({error}));
};
