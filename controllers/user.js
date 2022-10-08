
const bcrypt = require('bcrypt')
const User = require('../models/User')

//Installation de bcrypt // npm install --save bcrypt

exports.signup = (req, res, next) => {
    //hasher le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then( hash => { // Recuprer le hash de mot de passe et on l'enregistre dans un user 
        const user = new User ({ email: req.body.email, password: hash /* hash cree qu'on enregistre */});
        user.save()
        .then(() => res.status(201).json({message : "Utilisateur créé !"}))
        .catch( error => res.status(400).json(error))
    })  // Ici on recupere le hash de mot de passe
    .catch(error => res.stat(500).json(error)) // 500 erreur serveur
    // combien de fois on execute l'algorithme de hasher => 10 tour
};


exports.login = (req, res, next) => {

};
 