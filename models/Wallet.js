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
}, { timestamps: true })



const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    senderWallet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Wallet',
        required: true
    },
    receiverWallet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Wallet'
    },
    transactionId: {
        type: String
    },
    accessCode: {
        type: String
    },
    amount: Number
}, { timestamps: true })



const Wallet = mongoose.model('Wallet', WalletSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = { Wallet, Transaction };