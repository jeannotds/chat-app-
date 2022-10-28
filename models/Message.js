

const mongoose = require('mongoose')



const MessageSchema = mongoose.Schema({
    chatId:{ type: String },  //ConversationID recepteur
    senderId: { type: String },
    text: { type: String }
}, 
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Message', MessageSchema)