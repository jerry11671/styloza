const mongoose = require('mongoose')


const CatalogueSchema = new mongoose.Schema({
    designerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user for this']
    },
    designType: {
        type: String,
        required: [true, 'Please provide the design type']
    },
    pricing: {
        type: Number,
        required: [true, 'Please provide the price of the item']
    },
    description: {
        type: String
    },
    image: String
}, {timestamps: true})






module.exports = mongoose.model('Catalogue', CatalogueSchema);