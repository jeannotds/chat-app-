

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')
const passport = require('passport')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/', userCtrl.getOnUser)
router.get('/protected', passport.authenticate('jwt', {session: false}), userCtrl.protectedUser)
 
module.exports = router;