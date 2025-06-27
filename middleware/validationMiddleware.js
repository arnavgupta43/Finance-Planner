const { validationResult, body } = require("express-validator");
const typeValidation = [
  body("type")
    .notEmpty()
    .withMessage("type must be provided")
    .customSanitizer(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    )
    .isIn(["Income", "Expense"])
    .withMessage("Type must belong to Income or Expense "),
];
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msgs = errors
      .array()
      .map((e) => e.msg)
      .join(", ");
    return res.status(400).json({ status: "Failed", errors: msgs });
  }
  next();
};
const { check } = require("express-validator");

const transactionValidators = [
  check("date").notEmpty().withMessage("Date must be provided"),
  check("description").notEmpty().withMessage("Description must be provided"),
  check("amount").notEmpty().withMessage("Amount must be provided"),
  check("category").notEmpty().withMessage("Category must be correct"),
  check("type")
    .notEmpty()
    .isIn(["Income", "Expense"])
    .withMessage("Type must be either 'Income' or 'Expense'"),
];
module.exports = { typeValidation, transactionValidators, validate };
