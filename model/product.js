const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
