const Users = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const Register = async (req, res) => {
  try {
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
      .json({ msg: "Unexpected error" });
  }
};
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "Failed", msg: "User does not exist" });
    }
    const isPasswordCorrect = user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "Failed", msg: "Incorrect Password" });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ username: user.getName(), token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpected error" });
  }
};

module.exports = {
  Login,
  Register,
};
