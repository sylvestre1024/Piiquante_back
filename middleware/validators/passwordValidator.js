// External requires

const passwordValidator = require("password-validator");

module.exports = async (req, res, next) => {
    try {
        const { password } = req.body;
        // Creation of schema for password
        const passwordSchema = new passwordValidator();

        passwordSchema
            .is().min(8)
            .is().max(12)                                    
            .has().uppercase()                               
            .has().lowercase()                               
            .has().digits(2)                                 
            .has().not().spaces()                            
            .is().not().oneOf(['Passw0rd', 'Password123', 'Password123456'])
        if (passwordSchema.validate(password)) {
            next();
        } else {
            res.status(400).json({ message: `Le mot de passe doit contenir ${passwordSchema.validate('password', { list: true })}` })
        }
    } catch (err) {
        res.status(400).json({ message: "Le mot de passe est invalide" })
    }
}
