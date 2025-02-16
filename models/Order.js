const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    designer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide the name of the product']
    },
    quantity: {
        type: Number,
        default: 0
    },
    transactionId: {
        type: String
    },
    pricingTier: {
        type: String,
        default: 'Luxury'
    },
    costOffered: {
        type: Number
    },
    isExactly: Boolean,
    isCustomized: Boolean,
    isCompleted: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })




module.exports = mongoose.model('Order', OrderSchema);