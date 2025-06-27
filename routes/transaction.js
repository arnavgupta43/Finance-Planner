const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const {
  typeValidation,
  transactionValidators,
} = require("../middleware/validationMiddleware");
const { check } = require("express-validator");
const {
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
router.route("/").get(authMiddleware, getTransaction);
router
  .route("/")
  .post(
    authMiddleware,
    transactionValidators,
    typeValidation,
    validate,
    addTransaction
  );
router.route("/:id").put(authMiddleware, updateTransaction);
router.route("/:id").delete(authMiddleware, deleteTransaction);

module.exports = router;
