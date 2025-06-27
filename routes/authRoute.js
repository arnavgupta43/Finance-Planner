const express = require("express");
const router = express.Router();
const { Login, Register } = require("../controllers/auth");
const { validate } = require("../middleware/validationMiddleware");
const { check } = require("express-validator");
router
  .route("/register")
  .post(
    [
      check("username").notEmpty().withMessage("Username must be provided"),
      check("email").isEmail().withMessage("Email must be provided"),
      check("password").notEmpty().withMessage("Passwordd must be provided"),
    ],
    validate,
    Register
  );
router
  .route("/login")
  .post(
    [
      check("username").notEmpty().withMessage("Username must be provided"),
      check("password").notEmpty().withMessage("Password must be provided"),
    ],
    validate,
    Login
  );

module.exports = router;
