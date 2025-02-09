const { User, Otp } = require("../../models/User");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const transporter = require('../../middlewares/send-email');


const register = async (req, res, next) => {
  const { email, firstName, lastName, password, password2 } = req.body;

  if (!email || !firstName || !lastName || !password || !password2) {
    throw new BadRequestError("Please provide all fields");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new BadRequestError("User with this email already exists");
  }

  if (password !== password2) {
    throw new BadRequestError("Passwords do not match");
  }

  const user = await User.create({ email, firstName, lastName, password });
  const token = user.createJWT();

  let otpCode = await Otp.findOne({ userId: user._id })

  if (!otpCode) {
    otpCode = Math.floor(Math.random() * 1000000).toString();

    await Otp.create({ userId: user._id, code: otpCode });
  }

  try {
    const info = await transporter.sendMail({
      from: '"Styloza" <chiemenagodson532@gmail.com>',
      to: user.email,
      subject: "Activate your account",
      text: `Thank you for joining us, Use this otp to verify your account \n ${otpCode}, \n This code is valid for only 10 minutes`,
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ status: true, user, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password to login");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnauthenticatedError("Invalid email");
  }

  if (user.isAdmin) {
    throw new UnauthenticatedError("Sorry, you are not a customer");
  }

  const isPasswordCorrect = await user.comparePasswords(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.createJWT();

  return res.status(StatusCodes.OK).json({ status: true, user, token: token });
};






module.exports = { register, login};
