const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../validators/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

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
      res.code = 400;
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
      res.code = 400;
      throw new Error("User not found");
    }
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }
    const code = generateCode(6);

    user.verifacionCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "Email verification code",
      code,
      content: "Verify your account",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verification code is sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.verifacionCode !== code) {
      res.code = 400;
      throw new Error("Invalid code");
    }

    user.isVerified = true;
    user.verifacionCode = null;
    await user.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "User verified successfully" });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 400;
      throw new Error("User not found");
    }

    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "Forgot Password code",
      code,
      content: "Change your password",
    });

    res.send(200).json({
      code: 200,
      status: true,
      message: "Forgot Password code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 400;
      throw new Error("User not found");
    }
    if (user.forgotPasswordCode !== code) {
      res.code = 400;
      throw new Error("Invalid code");
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();
    res.send(200).json({
      code: 200,
      status: true,
      message: "Password recoved successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
};
