const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const multer = require("multer");
const cors = require("cors");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "papers");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();
app.use(cors());
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("paperFile")
); //expects one file

const Section = require("./models/sectionModel");
const Paper = require("./models/paperModel");

const Review = require("./models/reviewModel");
sequelize.sync( );

Section.sync();
Paper.sync();
Review.sync();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
const paperRouter = require("./routes/paperRouter");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/reviewer", reviewerRouter);
app.use("/paper", paperRouter);

app.listen(8000);
