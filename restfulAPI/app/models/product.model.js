const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        trim: true
    }, price: {
        type: Number,
        required: [true, "price required"]
    }, imageUrl: {
        type: String,
        required: true
    }, created_at: {
        type: Date
    }, updated_at: {
        type: Date
    }
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product