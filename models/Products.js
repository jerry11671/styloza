const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of product']
    }, 
    price: {
        type: Number,
        required: [true, 'Please provide the price of the product']
    },
    image: {
        type: String,
        required: [true, 'Please provide an image for your product']
    },
}, {timestamps: true})





module.exports = mongoose.model('Product', ProductSchema);