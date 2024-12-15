require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODE_EMAIL_USER,
    pass: process.env.NODE_EMAIL_PASS,
  },
});


module.exports = transporter;