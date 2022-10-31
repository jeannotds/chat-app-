
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// const routerRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message')
// const server = require('./server')

const passport = require('passport');
const cors = require('cors')

  mongoose.connect('mongodb+srv://jeannotds:jeannot1997@cluster0.f0osgcn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();
  
  app.use(express.json())
  app.use(bodyParser.json())
  app.use(cors())
  app.use(passport.initialize())

  require('./passport/passport')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/auth', userRoutes)
app.use('/message', messageRoutes)


module.exports = app;