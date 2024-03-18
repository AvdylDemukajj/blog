const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const { signupValidator } = require("../validators/authValidation");
const validate = require("../validators/validate");

router.post("/signup", signupValidator, validate, authController.signup);

module.exports = router;
