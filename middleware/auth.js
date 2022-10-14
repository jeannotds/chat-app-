const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    // Recuperer le token
    try{
        const token = req.headers.authorization.split(' ')[1]
        // decoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') // RANDOM_TOKEN_SECRET : La cles secret
        //Recuperons le User Id en particulier
        const userId = decodedToken.userId;

        //Rajouter cette valeur a l'objet request

        req.auth = {
            userId: userId
        }
        
    }
    catch(error) {
        res.json(401).json({ error })
    }
}