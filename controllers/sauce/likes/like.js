const Sauce = require("../../../models/Sauce");

exports.likeSauce = async (req, res) => {
  try{
    // Destructuring
    const {like, userId} = req.body;
    // Find sauce that needs to be updated
    const sauce = await Sauce.findById({_id: req.params.id})
    // Using switch to handle all the cases
    switch(like) {
      // If like === 1
      case 1:
            if (!sauce.usersLiked.includes(userId)) {
            /* Mongo db stucture
            _id :63177309f7b774d9887aa4c7
            userId :"630ce327fa539c00fe6280c8"
            likes:4
            usersLiked:Array
                0:"6307a085d5f532bd6cab18cb"
                1:"6307ab602c27c25f22c33553"
            dislikes:2
            usersDisliked:Array
                0:"630ce327fa539c00fe6280c8"
                1:"63207216060def1986ffb195"
             */

            // findByIdAndUpdate : (syntaxe) db.collection.findOneAndUpdate( filter, update, options )
            // $inc : for increments
            // $push : add itemAdd to arrayName
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}})
          res.status(200).json({message: "Je like cette sauce"})
        }
            break;
        // If like === 0
      case 0:
        if(sauce.usersLiked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
        res.status(200).json({message: "Je retire mon like"})
        }
        if(sauce.usersDisliked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
          res.status(200).json({message: "Je retire mon dislike"})
        }
            break;
        // If like === -1
      case -1:
        if(!sauce.usersDisliked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
          res.status(200).json({message: "Je dislike cette sauce"})
        }
            break;
    }

  } catch(err) {
    res.status(400).json({error: err})
  }
}