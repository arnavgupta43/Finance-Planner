const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const { check } = require("express-validator");
const getSummary = require("../controllers/summary");
router
  .route("/")
  .get(
    authMiddleware,
    [
      check("month")
        .notEmpty()
        .withMessage("Month must be provided")
        .isString()
        .trim()
        .escape(),
      check("year")
        .notEmpty()
        .withMessage("Year must be provided")
        .isString()
        .trim()
        .escape(),
    ],
    validate,
    getSummary
  );
module.exports = router;
