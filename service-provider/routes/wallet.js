const mongoose  = require('mongoose')
const express = require('express')
const {updateAccountDetails} = require('../controllers/wallet')
const authMiddleware = require('../middlewares/auth')

const router = express.Router();




router.put('/update-account-details', authMiddleware, updateAccountDetails);



module.exports = router;