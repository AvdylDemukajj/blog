const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../validators/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email alredy existe!");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("invalid creditials");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("invalid creditialsss");
    }

    const token = generateToken(user);

    res.status(200).json({
      code: 200,
      status: true,
      message: "User signin successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }
    const code = generateCode(6);

    user.verifacionCode = code;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verification code is sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, verifyCode };
