const User = require("../models/userModel");

exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  User.create({
    name: name,
    surname: surname,
    email: email,
    password: password,
    username: username,
  })
    .then((user) => {
      console.log("User created successfully");
      res.status(201).json({ message: 'User created!', userId: user.idUser });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
