const Message = require("../models/Message")


exports.addMessage = (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new Message({ chatId, senderId, text, });
    
    message.save()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
  };

 exports.getMessages =  (req, res) => {
    const chatId = req.params.chatId;
    const senderId = req.params.senderId;
    Message.find({
        $and: [{ $or: [{ senderId: senderId }, {chatId: senderId}] },
                { $or: [{ senderId: chatId }, {chatId : chatId}] }
            ],
              
    }) 
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}