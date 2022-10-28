const express = require('express')
const { addMessage, getMessages } = require('../controllers/message')

const router = express.Router()

router.post("/", addMessage)
// router.get("/:chatId", getMessages)
router.get("/:senderId/:chatId", getMessages)

module.exports = router