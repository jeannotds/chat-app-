const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
// const Thing = require('../models/Thing')
const stuffCtrl = require('../controllers/stuff')

// Nous avons mise en place un middle ware qui va authentifier nos requetes et transmettre 
//les informations au middleware suivant cad a nos gestionnaires de routes
router.get('/:_id', auth, stuffCtrl.getOnThing)
router.get('/', auth, stuffCtrl.createThing);
router.post('/', auth, stuffCtrl.getAllThing)
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.put('/:id', auth, stuffCtrl.modifyThing)
module.exports = router