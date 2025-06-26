const mongoose = require("mongoose");

const connect = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Data base connected");
  } catch (error) {
    console.log("Error while connecting to database");
    console.log(error);
  }
};

module.exports = connect;
