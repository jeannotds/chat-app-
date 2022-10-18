const Chat = require('../models/Chat') // ChatModel



const createChat = (req, res) => {
    const newChat = new Chat({ // ChatModel
        members : [req.body.senderId, req.body.reseiverId],
    })

    newChat.save()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

const userChats = (req, res) => {
    Chat.find({
        members: { $in: [req.params.userId] }
    })
    .then((chat) => {
        res.status(200).json(chat)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

const findChat = (req, res) => {
    Chat.findOne({
        members: {$all: [req.params.firstId, req.params.secondId]}
    })
    .then(chat => {
        res.status(200).json(chat)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
}

module.exports = {
    createChat, findChat, userChats
}