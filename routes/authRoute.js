const express = require("express");
const router = express.Router();
const { Login, Register } = require("../controllers/auth");
const { validate } = require("../middleware/validationMiddleware");
const { check } = require("express-validator");
router
  .route("/register")
  .post(
    [
      check("username")
        .notEmpty()
        .withMessage("Username must be provided")
        .isString()
        .trim()
        .escape(),
      check("email")
        .isEmail()
        .withMessage("Email must be provided")
        .isString()
        .trim()
        .escape(),
      check("password")
        .notEmpty()
        .withMessage("Passwordd must be provided")
        .isString()
        .trim()
        .escape(),
    ],
    validate,
    Register
  );
router
  .route("/login")
  .post(
    [
      check("username")
        .notEmpty()
        .withMessage("Username must be provided")
        .isString()
        .trim()
        .escape(),
      check("password")
        .notEmpty()
        .withMessage("Password must be provided")
        .isString()
        .trim()
        .escape(),
    ],
    validate,
    Login
  );

module.exports = router;
