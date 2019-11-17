const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = new mongoose.Schema({
    destination: {
        type:String,
        required: true,
        trim:true
    },user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref :'User'
    },Courier:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Courier'
    },position:{
        latitude:{
            type: Number
        },
        longitude:{
            type: Number
        }
    },created_at:{
        type:Date
    }
})
const Order = mongoose.model('Order', orderSchema)
module.exports = Order