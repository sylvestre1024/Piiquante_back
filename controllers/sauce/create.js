// Model used
const Sauce = require("../../models/Sauce");

// Method for creating a new sauce
exports.createSauce = async (req, res) => {
  try {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
      //The Object.create() method creates a new object, 
      // using an existing object as the prototype of the newly created object.
    await Sauce.create({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    res.status(201).json({message: "Sauce créée !"})
  } catch(err) {
    res.status(400).json({error : err})
  }
}