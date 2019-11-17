const mongoose = require('mongoose')
const validator = require('validator')

const historySchema = new mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Order'
    },status:{
        type:String,
        required: true
    },finished_at:{
        type:Date,
        required:true
    }
})
const History = mongoose.model('History', historySchema)
module.exports = History