

const mongoose = require('mongoose')



const MessageSchema = mongoose.Schema({
    chatId:{ type: String },  //ConversationID recepteur
    senderId: { type: String },
    text: { type: String },
    image: { type: Array }
}, 
    {
        timestamps: true
    }
)



module.exports = mongoose.model('Message', MessageSchema)