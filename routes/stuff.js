const express = require('express')
const router = express.Router()
// const Thing = require('../models/Thing')
const stuffCtrl = require('../controllers/stuff')


router.get('/:_id', stuffCtrl.getOnThing)
router.get('/', stuffCtrl.createThing);
router.post('/', stuffCtrl.getAllThing)
router.delete('/:id', stuffCtrl.deleteThing);
router.put('/:id', stuffCtrl.modifyThing)
module.exports = router