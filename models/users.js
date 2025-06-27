require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [10, "Invalid hash length"],
      select: false,
    },
    theme: {
      type: String,
      enum: ["Light", "dark"],
      default: "Light",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcryptjs.compare(enteredpassword, this.password);
};
userSchema.methods.getUserName = function () {
  return this.username;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { username: this.username, _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = mongoose.model("Users", userSchema);
