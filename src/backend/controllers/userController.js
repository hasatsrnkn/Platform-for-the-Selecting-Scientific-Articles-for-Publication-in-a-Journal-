const User = require("../models/userModel");

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (!users) {
        const error = new Error("No users");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.changeUserRole = (req, res, next) => {
  const userId = req.body.userId;
  const role = req.body.role;
  console.log(role);
  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }
      user.update({ role: role });
      res.status(200).json({ message: "Role updated successfully" }); // Send a JSON response
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
