
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const routerRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

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

app.use('/api/stuff', routerRoutes)
app.use('/api/auth', userRoutes)


module.exports = app;