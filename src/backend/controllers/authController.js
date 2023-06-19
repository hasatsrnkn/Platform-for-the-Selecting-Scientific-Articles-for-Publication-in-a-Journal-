const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModels/userModel");

exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  bcrypt.hash(password, 12).then((hashedPassword) => {
    User.create({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      username: username,
    })
      .then((user) => {
        console.log("User created successfully");
        return res
          .status(201)
          .json({ message: "User created!", userId: user.idUser });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "No User Found!" });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ message: "Wrong Password!" });
      }
      const token = jwt.sign(
        {
          username: loadedUser.username,
          userId: loadedUser.idUser,
          role: loadedUser.role,
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token: token,
        userId: loadedUser.idUser.toString(),
        role: loadedUser.role,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.newProfileInformation = (req, res, next) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "No User Found!" });
      }
      user.update({
        name: name,
        surname: surname,
        email: email,
      });
      return res
        .status(201)
        .json({
          message: "User changed successfully!",
          userId: user.idUser,
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putPassword = (req, res, next) => {
  const userId = req.body.userId;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "No User Found!" });
      }
      loadedUser = user;
      return bcrypt.compare(currentPassword, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ message: "Wrong Password!" });
      }
      bcrypt.hash(newPassword, 12).then((hashedPassword) => {
        loadedUser
          .update({
            password: hashedPassword,
          })
          .then((newPasswordedUser) => {
            console.log("Password changed successfully");
            return res
              .status(201)
              .json({
                message: "Password changed successfully!",
                userId: newPasswordedUser.idUser,
              });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      });
    });
};

exports.postReset = (req, res, next) => {
  // should be called wnen the button "send email" clicked

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    console.log(token);
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No User Found!" });
        }

        user.update({
          resetToken: token,
          resetTokenExpiration: Date.now() + 3600000,
        });
        console.log("test");
        transporter.sendMail({
          to: req.body.email,
          from: "Review Platform",
          subject: "Password reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/resetpassword/${token}">link</a> to set a new password.</p>
          `,
        });
        return res
          .status(201)
          .json({ message: "Email is sent for resetting password!" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "admreviewplatform@gmail.com",
    pass: "jntrenqiiloxsiqa",
  },
});

exports.getNewPassword = (req, res, next) => {
  // should be followed by the link from the email
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({
        userId: user.idUser.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  // should be called when "reset" button clicked on page "new password"
  const newPassword = req.body.password;
  const userId = req.body.idUser;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No User Found!" });
      }
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiration: null,
      });
    })
    .then((result) => {
      return res.status(201).json({ message: "Password is changed!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
