const mongoose = require('mongoose');


const WalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
        default: 0
    },
    bankName: String,
    accountNumber: {
        type: String,
        max: 10
    },
    accountName: String,
    currency: {
        type: String,
        default: 'NGN'
    }
}, {timestamps: true})



module.exports = mongoose.model('Wallet', WalletSchema)