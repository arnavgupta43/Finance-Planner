const mongoose = require("mongoose");
const validate = require("validator");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username can be at most 30 characters"],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      index: true,
      validate: {
        validator: (e) => validator.isEmail(e),
        message: "Enter a valid email",
      },
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minlength: [60, "Invalid hash length"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
