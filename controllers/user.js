
const bcrypt = require('bcrypt')
const User = require('../models/User')

//Enregistrement nouveau utilisateur
// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then( hash => { 
//         const user = new User ({ email: req.body.email, password: hash});
//         user.save()
//         .then(() => res.status(201).json({message : "Utilisateur créé !"}))
//         .catch( error => res.status(400).json({error}))
//     })  
//     .catch(error => res.status(500).json({error})) 
// };

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
// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//     .then(user => {
//         if(user === null) {
//             res.status(401).json({ message : "Paire identifiant/mot de passe incorrect" })
//         }
//         else{
//             bcrypt.compare(req.body.password, user.password)
//             .then(valid => {
//                 if(!valid) {
//                     res.status(401).json({  message : "Paire identifiant/mot de passe incorrect" })
//                 }
//                 else{
//                     res.status(200).json( {
//                         userId : user._id,
//                         token: 'TOKEN'
//                     } )
//                 }
//             })
//             .then(error => {
//                 res.status(500).json( {error} );
//             })
//         }
//     })
//     .catch(error => {
//         res.status(500).json( {error} )
//     })
//  };
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
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
 

//  exports.getAllThing = (req, res, next) => {
//     delete req.body._id; 
//     const thing = new Thing({...req.body})
//     thing.save()
//     .then(res.status(201).json({message : "Objet enregistré !"})) 
//     .catch(error => res.status(404).json(error))
// }

//  exports.getAllUsers = (req, res, next) => {
//     delete req.body._id;
//     const user = new User({ ...req.body})
//     user.save()
//     .then(res.status(201).json({user})) 
//     .catch(error => res.status(404).json(error))
//  }