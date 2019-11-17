const mongoose = require('mongoose')
const validator = require('validator')

const courierSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "name required"],
        trim:true
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email invalid')
            }
        }
    },password: {
        type: String,
        required: [true, "password required"],
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },position:{
        latitude:{
            type: Number
        },
        longitude:{
            type: Number
        }
    },order:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },created_at:{
        type:Date
    },updated_at:{
        type:Date
    }
})
const Courier = mongoose.model('Courier', courierSchema)
module.exports = Courier