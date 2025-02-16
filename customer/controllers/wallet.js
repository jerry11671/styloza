require('dotenv').config();
const { Wallet, Transaction } = require('../../models/Wallet');
const { StatusCodes } = require('http-status-codes')
const axios = require('axios');


const initiateTransaction = async (req, res) =>{
    const { email, walletId } = req.user
    const { amount } = req.body;
    const url = 'https://api.paystack.co/transaction/initialize';
    const headers = {
        'content-type': 'application/json',
        Authorization: `Bearer sk_test_6d778b43fdb07b7d9f22da2aa2dc1c7737a615c6`
    }

    const data = {
        email: email,
        amount: amount
    }

    const response = await axios({
        method: 'post',
        headers: headers,
        url: url,
        data: data
    })

    res.status(StatusCodes.OK).json(response.data);
}


const verifyTransaction = async (req, res) => {
    const { reference } = req.params;
    const url = `https://api.paystack.co/transaction/verify/${reference}`;

    const headers = {
        Authorization: `Bearer sk_test_6d778b43fdb07b7d9f22da2aa2dc1c7737a615c6`
    }
    const response = await axios({
        method: 'get',
        url: url,
        headers: headers,
    })

    res.status(StatusCodes.OK).json(response.data)
}



module.exports = { initiateTransaction, verifyTransaction }