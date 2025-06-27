const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const { check } = require("express-validator");
const {
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
router.route("/");
