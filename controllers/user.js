
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken') //jsonwebtoken

//Enregistrement nouveau utilisateur

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
 

// Verifier  SI un utilisateur existe

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            //Le donnees qu'on veut encoder
                            {userId: user._id},
                            //Cles secre d'encodage
                            'RANDOM_TOKEN_SECRET',
                            //Configuration. chaque token durera 24h
                            { expireIn: '24' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 exports.getAllUsers = (req, res, next) => {
    delete req.body._id;
    const user = new User({ ...req.body})
    user.save()
    .then(res.status(201).json({user})) 
    .catch(error => res.status(404).json(error))
 }