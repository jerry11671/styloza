require('dotenv').config();
const { Wallet } = require('../../models/Wallet');
const { StatusCodes } = require('http-status-codes')
const axios = require('axios');




const updateAccountDetails = async (req, res) => {
    const { id: userId } = req.user;
    const updatedWallet = Wallet.findByIdAndUpdate({ userId: userId }, req.body)
    return res.status(StatusCodes.OK).json({ status: true, updatedWallet })
}




module.exports = { updateAccountDetails }