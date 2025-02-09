const express = require('express');
const router = express.Router()

const { placeOrder } = require('../controllers/orders')


router.post('/place', placeOrder);



module.exports = router