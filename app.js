
const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/Thing')
const bodyParser = require('body-parser')

  mongoose.connect('mongodb+srv://jeannotds:jeannot1997@cluster0.f0osgcn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();
  app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/stuff', (req, res, next) => {
    // enlever le champ Id du corps de la requete parce qu'il sera generé auto.
    // Retirer le champs Id avant de copier
    delete req.body._id; 
    const thing = new Thing({...req.body})
    // Enregistre l'objet dans la BD et retourne une promesse
    thing.save()
    .then(res.status(201).json({message : "Objet enregistré !"})) // renvoyer une reponse
    .catch(error => res.status(404).json(error)) // Recuperer l'error et envoyer un code 404
})

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id}) // Pour trouver un seule objet
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json)
})

app.get('/api/stuff', (req, res, next) => {
  Thing.find() // Pour trouver tous les objets
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json())
});

//  app.get('/api/stuff', (req, res, next) => {
//     const stuff = [
//         {
//           _id: 'oeihfzeoi',
//           title: 'Mon premier objet',
//           description: 'Les infos de mon premier objet',
//           imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//           price: 4900,
//           userId: 'qsomihvqios',
//         },
//         {
//           _id: 'oeihfzeomoihi',
//           title: 'Mon deuxième objet',
//           description: 'Les infos de mon deuxième objet',
//           imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//           price: 2900,
//           userId: 'qsomihvqios',
//         },
//       ];
//   res.status(200).json(stuff)

// });

module.exports = app;