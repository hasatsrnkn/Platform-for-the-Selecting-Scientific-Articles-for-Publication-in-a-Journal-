const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const reviewerRouter = require("./routes/reviewerRouter");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/reviewer", reviewerRouter);

app.listen(8000);
