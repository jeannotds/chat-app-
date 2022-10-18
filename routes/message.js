const express = require('express')

const router = express.Router()

router.post("/", addMessage)
router.get("/:chatId", getMessages)

module.exports = router