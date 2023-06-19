const express = require("express");
const router = express.Router();
const User = require("../models/UserModels/userModel");

const { check, body } = require("express-validator");
const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");

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
      .isLength({ min: 5 })
      .withMessage("Username must be longer than 5 characters")
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

router.put("/put-new-password" , isAuth, authController.putPassword);

router.post("/login", authController.login);

router.post("/post-reset-password", authController.postReset);

router.get("/get-new-password/:token", authController.getNewPassword);

router.put("/change-user-information", isAuth, authController.newProfileInformation);

router.post(
  "/post-new-password",
  body("passwordToken").custom((value, { req }) => {
    return User.findOne({ where: { resetToken: value } }).then((userDoc) => {
      if (!userDoc) {
        return Promise.reject("No User Found");
      }
    });
  }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be longer than 5 characters"),
  authController.postNewPassword
);

module.exports = router;
