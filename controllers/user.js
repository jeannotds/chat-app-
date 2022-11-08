
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken'); //jsonwebtoken

//Enregistrement nouveau utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            picture: req.body.picture
        });
        user.save()
          .then(() => res.status(201).json(
            { 
                message: 'Utilisateur créé !' ,
                success: 'true',
                user: user
            }
        ))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ 

            message: 'User non créé ! Il y a un probleme !' ,
            success: 'false',
            error: error

       }));
  };


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Utilisateur non trouvé'
                 });
            }

            //Mot de passe incorrect
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ 
                            success: false,
                            error: 'Mot de passe incorrect !' 
                        });
                    }
                    
                    const payload = {
                        email_user: user.email,
                        id: user._id
                    }
                    
                    const token = jwt.sign(
                        payload,
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )

                    return res.status(200).json({
                        success: true,
                        message: "charger avec succes",
                        token: "Bearer " + token,
                        user
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

  exports.getOnUser = async (req, res) => { 
    
    const users = await User.find({ _id: { $ne: req.params.id } })
    // const users = await User.find({ _id: { $in: req.params.id } })
        res.json(users)
}
    
 exports.protectedUser = (req, res) => {
    return res.status(200).send({
        success : true,
        user: {
            id: req.user._id,
            useremail: req.user.email,
        }   
    })
}

exports.getOneUser = (req, res) => {

    const userId = req.params.id;

    User.find({_id : {$ne : userId}})
    .then((data)=>{
        res.status(200).send({
            user:data
        })
    }).catch((error)=>{
        res.status(400).json(error)
    })
}



















// const secretRoute = (req, res) => { 
    
//     return res.status(200)
               
// }