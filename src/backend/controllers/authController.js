const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array())
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
