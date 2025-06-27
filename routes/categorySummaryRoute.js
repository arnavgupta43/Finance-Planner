const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const { check } = require("express-validator");
const getCategorySummary = require("../controllers/categortSummary");

router
  .route("/category-summary")
  .get(
    authMiddleware,
    [
      check("month")
        .notEmpty()
        .withMessage("Month should not be empty")
        .isString()
        .trim()
        .escape(),
      check("year")
        .notEmpty()
        .withMessage("Year should not be empty")
        .isString()
        .trim()
        .escape(),
    ],
    validate,
    getCategorySummary
  );
module.exports = router;
