const mongoose = require("mongoose");
const validate = require("validator");
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User reference is required"],
      index: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
      validate: {
        validator: (d) => d <= new Date(),
        message: "Date cannot be in the future",
      },
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minlength: [3, "Minimum length should be 3"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      validate: {
        validator: (a) => a > 0,
        message: "Amount should be greater than 0",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: [true, "Type is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);
