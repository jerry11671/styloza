const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/auth');
const {verifyOtpCode, requestOtp} = require('../../common/controllers/auth')
const authMiddleware = require('../middlewares/auth')
const createWalletMiddleware = require('../middlewares/create-wallet')


router.post('/register', createWalletMiddleware, register);
router.post('/login', login);
router.post('/verify-otp', authMiddleware, verifyOtpCode);
router.get('/request-otp', authMiddleware, requestOtp);




module.exports = router;
