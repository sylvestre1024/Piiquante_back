// Model used
const Sauce = require("../../../models/Sauce");

exports.likeSauce = async (req, res) => {
    try {
        // Destructuring
        const { like } = req.body;
        const { userId } = req.auth.userId;
        // get the authenticated userId
        if (req.body.userId != req.auth.userId) {
            res.status(401).json({ message: 'Not authorized' });
        } else {

            // Find sauce that needs to be updated
            const sauce = await Sauce.findById({ _id: req.params.id })
            // Using switch to handle all the cases
            switch (like) {
                // If like === 1
                case 1:
                    // Si notre résultat de recherche dans la BDD, ne correspond PAS à l'utilisateur
                    // cet utilisateur différent a le droit de liker
                    // The includes() method returns true if a string contains a specified string
                    if (!sauce.usersLiked.includes(userId)) {
                        // action de mise à jour dans la BDD, 
                        // // Operator "$inc" will increment a value to an existing data
                        // The operator "$push" will add a data to an existing array
                        //console.log("Adding like !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: userId } })
                        res.status(200).json({ message: "Je like cette sauce" })
                    }
                    break;
                // If like === 0
                // Si notre résultat de recherche dans la BDD, correspond BIEN à l'utilisateur
                // cas d'une action de Liked
                case 0:
                    if (sauce.usersLiked.includes(userId)) {
                        //console.log("Removing like !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
                        res.status(200).json({ message: "Je retire mon like" })
                    }
                    // cas d'une action de Disliked
                    if (sauce.usersDisliked.includes(userId)) {
                        //console.log("Removing disliked !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
                        res.status(200).json({ message: "Je retire mon dislike" })
                    }
                    break;
                // If like === -1
                // Si notre résultat de recherche dans la BDD, ne correspond PAS à l'utilisateur
                // pour lequel il y a une demande de Disliked
                // alors il a le droit de Disliked
                case -1:
                    if (!sauce.usersDisliked.includes(userId)) {
                        //console.log("Adding disliked !");
                        await Sauce.findByIdAndUpdate({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } })
                        res.status(200).json({ message: "Je dislike cette sauce" })
                    }
                    break;
            }
        }

    } catch (err) {
        res.status(400).json({ error: err })
    }
}
