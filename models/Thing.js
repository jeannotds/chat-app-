const mongoose = require('mongoose') // Pour creer le chemin

// Schema de projet
const thingSchema = mongoose.Schema({
    titre: { type : String, require: true },
    description: { type : String, require: true },
    imageUrl: { type : String, require: true },
    userId: { type : String, require: true },
    price: { type : Number, require: true }
})

 //1ere le nom du modele. 2eme le schema qu'on veut utiliser
 module.exports = mongoose.model('Thing', thingSchema)