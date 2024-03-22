const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
} = require("../validators/authValidation");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");

router.post("/signup", signupValidator, validate, authController.signup);
router.post("/signin", signinValidator, validate, authController.signin);
router.post(
  "/send-verification-email",
  emailValidator,
  validate,
  authController.verifyCode
);

router.post(
  "/verify-user",
  verifyUserValidator,
  validate,
  authController.verifyUser
);

router.post(
  "/forgot-password-code",
  emailValidator,
  validate,
  authController.forgotPasswordCode
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword
);

router.put("/change-password", isAuth, authController.chenagePassword);

module.exports = router;
