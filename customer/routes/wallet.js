const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middlewares/auth')
const { initiateTransaction, verifyTransaction } = require('../controllers/wallet');


router.post('/initiate-transaction', authMiddleware, initiateTransaction);
router.get('/verify-transaction/:reference', authMiddleware, verifyTransaction);



module.exports = router;