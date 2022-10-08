const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { schema } = require('./Thing')
//mongoose unique validator : permet de donner a notre mail une valeur unique
//npm install --save mongoose-unique-validator

const userSchema = mongoose.Schema({
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true }
})

// appeller ce schema et unique validator
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);