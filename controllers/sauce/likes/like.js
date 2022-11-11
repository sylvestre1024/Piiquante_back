// Model used
const Sauce = require("../../../models/Sauce");

 exports.likeSauce = (req, res, next) => {
    const userId = req.auth.userId; //userId qui est stocké dans le jeton
    const like = req.body.like;     //accès au corps req de like
    const sauceId = req.params.id;  //acces à l'id de la sauce
 
    Sauce.findOne({_id : sauceId})//Renvoie une entrée qui satisfait les critères de la requête spécifiés provenant de la collection (issue de la base de données en NoSql)
    .then((sauce) => {

      // like = 1 (likes +1 )
        if (!sauce.usersLiked.includes(userId) && like === 1) {//cherche dans le tableau des "userLiked" si le "userId" n'a pas déjà voté
        Sauce.updateOne({_id : sauceId},//mise à jour de la sauce
          {
            $inc: {likes: 1},            //$inc  : Incrémente la valeur du champ
            $push: {usersLiked: userId}  //$push : Ajoute un élément à un tableau.
          }
          )
          .then(() => res.status(201).json({message: "User like +1"}))
          .catch((error) => res.status(400).json({error}));
      };
      //like = 0 (likes = 0)
      if(sauce.usersLiked.includes(userId) && like === 0){
        Sauce.updateOne({_id : sauceId},
          {
            $inc: {likes: -1},
            $pull: {usersLiked: userId} 
          }
          )
          .then(() => res.status(201).json({message: "User like 0"}))
          .catch((error) => res.status(400).json({error}));
      };

      //like -1 (dislikes +1)
        if (!sauce.usersDisliked.includes(userId) && like === -1) {//cherche dans le tableau des "userDisliked" si le "userId" n'a pas déjà voté
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
