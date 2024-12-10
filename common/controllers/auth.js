const { User, Otp } = require("../../models/User");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const transporter = require('../../middlewares/sendMail');


const verifyOtpCode = async (req, res) => {
    const { email, otpCode } = req.body;
    const { id: userId } = req.user;
  
    if (!email || !otpCode) {
      throw new BadRequestError("Please provide email and otp code");
    }
  
    const otp = await Otp.findOne({ userId: userId, code: otpCode });
  
    if (!otp) {
      throw new BadRequestError('Otp code is not correct');
    }
  
    const date = new Date();
  
    if (date.getTime() > otp.otpExpiryDate.getTime()) {
      await otp.deleteOne()
      throw new BadRequestError('Otp code has expired, please request a new one')
    }
  
    if (otp.code === otpCode) {
      const user = await User.findByIdAndUpdate({ _id: otp.userId }, { isVerified: true })
      await otp.deleteOne()
      return res.status(StatusCodes.OK).json({ status: true, msg: 'Account has been verified' })
    }
  
    throw new BadRequestError('Otp code is not correct')  
  }

  

const requestOtp = async (req, res) => {
    const {id:userId, email} = req.user

    const code = Math.floor(Math.random(0, 1) * 1000000).toString()
    
    const otp = await Otp.create({userId, code: code}) 

    try {
        const info = await transporter.sendMail({
        from: '"Styloza" <chiemenagodson532@gmail.com>',
        to: email,
        subject: "Activate your account",
        text: `Thank you for joining us, Use this otp to verify your account \n ${otp.code}, \n This code is valid for only 10 minutes`,
        });
        console.log("Email sent!");
    } catch (error) {
        console.log(error);
    }

    return res.status(StatusCodes.OK).json({status: true, msg: 'Check your email'});
  
}



module.exports = {verifyOtpCode, requestOtp };
  
