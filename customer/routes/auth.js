const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth')
const {verifyOtpCode, requestOtp} = require('../../common/controllers/auth')
const authMiddleware = require('../../middlewares/auth')

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', authMiddleware, verifyOtpCode);
router.post('/request-otp', authMiddleware, requestOtp);




module.exports = router;