const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const { signupValidator } = require("../validators/authValidation");

router.post("/signup", signupValidator, authController.signup);

module.exports = router;
