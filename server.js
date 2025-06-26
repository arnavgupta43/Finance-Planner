require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
};

start();
