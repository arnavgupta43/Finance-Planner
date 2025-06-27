const Users = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const Register = async (req, res) => {
  try {
    console.log("Route Hit");
    const { username, password, email } = req.body;
    const user = await Users.create({ username, password, email });
    if (!user) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "Failed", msg: "Error while creating user" });
    }
    const token = user.createJWT();
    return res
      .status(StatusCodes.CREATED)
      .json({ status: "success", data: { user, token } });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpected error", error: error.message });
  }
};
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "Failed", msg: "User does not exist" });
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "Failed", msg: "Incorrect Password" });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ username: user.getUserName(), token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpected error", error: error.message });
  }
};

module.exports = {
  Login,
  Register,
};
