const express = require('express');
const router = express.Router()

const { createProduct } = require('../controllers/products')


router.post('/create', createProduct);



module.exports = router;