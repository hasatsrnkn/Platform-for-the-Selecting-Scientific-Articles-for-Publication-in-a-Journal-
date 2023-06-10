const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const { check, body } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/sign-up",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("username")
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ where: { username: value } }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username already exists!");
          }
        });
      }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be longer than 5 characters"),
  ],
  authController.signUp
);

module.exports = router;