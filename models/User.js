require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Wallet = require('./Wallet');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide first name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email',]
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.post('save',  async function () {
    if (this.isAdmin == true) {
        await Wallet.create({userId: this._id})
    }
})


UserSchema.methods.createJWT = function () {
    return jwt.sign({
        firstName: this.firstName,
        lastName: this.lastName,
        id: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}


UserSchema.methods.comparePasswords = async function (userPassword) {
    const isPasswordCorrect = await bcrypt.compare(userPassword, this.password);
    return isPasswordCorrect
}


const OtpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    otpExpiryDate: {
        type: Date,
        default: new Date()
    }
}, {timestamps: true})

OtpSchema.pre('save', function () {
    const otpExpiryDate = new Date(Date.now() + 600000); // 10 minutes
    this.otpExpiryDate = otpExpiryDate;
})


const User = mongoose.model('User', UserSchema);
const Otp = mongoose.model('Otp', OtpSchema);

module.exports = {User, Otp}