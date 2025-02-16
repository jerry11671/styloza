const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

router.post('/webhook', (req, res) => {
    console.log(res.data);
    res.status(StatusCodes.OK).json({ status: true, msg: 'Webhook received successfully' });
})




module.exports = router;