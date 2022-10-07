
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


app.get('/api/stuff/:_id', (req, res, next) => {
    Thing.findOne({_id: req.params.id}) // Pour trouver un seule objet
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json(error))
})

app.get('/api/stuff', (req, res, next) => {
  Thing.find() // Pour trouver tous les objets
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json())
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


app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id})
  .then(() => res.status(200).json({ message :"Objet modifié" }))
  .catch(error => res.status(404).json({ error }))

})

module.exports = app;