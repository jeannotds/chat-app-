const Chat = require('../models/Chat') // ChatModel



exports.createChat = async (req, res) => {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error);
    }
  };

// const userChats = (req, res) => {
//     Chat.find({
//         members: { $in: [req.params.userId] }
//     })
//     .then((chat) => {
//         res.status(200).json(chat)
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// }

// const findChat = (req, res) => {
//     Chat.findOne({
//         members: {$all: [req.params.firstId, req.params.secondId]}
//     })
//     .then(chat => {
//         res.status(200).json(chat)
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
    
// }

// module.exports = {
//     createChat, findChat, userChats
// }