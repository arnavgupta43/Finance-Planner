require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const express = require("express");
const authRouter = require("./routes/authRoute");
const summaryRoute = require("./routes/summaryRoute");
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    status: "Fail",
    msg: "Too many requests, please try again later.",
  },
});
app.use(limiter);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/summary", summaryRoute);
app.use((req, res, next) => {
  res.status(404).json({ status: "Fail", msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const msg = err.message || "Something went wrong";
  res.status(status).json({ status: "Error", msg });
});

module.exports = app;
