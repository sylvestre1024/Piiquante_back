// External requires
const mongoose = require("mongoose");

//debug mod of mongoose
//mongoose.set('debug', true);

// Connection to database
mongoose
    .connect(
        `${process.env.MONGODB_CONNECTION}`
    )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

// Exportation de mongoose
module.exports = mongoose;