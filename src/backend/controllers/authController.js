const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

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

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        throw error;
      }
      console.log(user);
      res.status(200).json({ message: "User fetched.", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
