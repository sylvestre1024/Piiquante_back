// External requires
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.JWT_TOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error })); // message erreur explicite a rajouter
        })
        .catch(error => res.status(500).json({ error })); // message erreur explicite a rajouter
};