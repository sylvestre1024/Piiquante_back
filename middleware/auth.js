//middleware/auth.js

// External requires
const jwt = require('jsonwebtoken')

// Method for checking Id using stored token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valide";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requ�te non authentifi�e" });
    }
};
