const express = require("express");
const router = express.Router();
const { categoryController } = require("../controller");
const { addCategoryValidator } = require("../validators/categoryValidation");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");

router.post(
  "/",
  isAuth,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);

module.exports = router;
