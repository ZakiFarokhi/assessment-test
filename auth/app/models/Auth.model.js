var mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    tempToken:{
        type:String 
    },token:{
        type:String
    },created_at:{
        type:Date
    },expired_at:{
        type:Date
    }
})
const Token = mongoose.model('Token', tokenSchema)
module.exports = Token