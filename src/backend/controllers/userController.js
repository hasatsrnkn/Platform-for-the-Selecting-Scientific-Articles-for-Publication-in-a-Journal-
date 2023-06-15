const ChiefEditor = require("../models/UserModels/chiefEditorModel");
const Reviewer = require("../models/UserModels/reviewerModel");
const SectionEditor = require("../models/UserModels/sectionEditorModel");
const SelectionAssistantEditor = require("../models/UserModels/selectionAssistantEditorModel");
const User = require("../models/UserModels/userModel");
const VicePresident = require("../models/UserModels/vicePresidentModel");
const Grade = require("../models/gradeModel");
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

  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }
      const UserClass = getUserClass(role);
      if (!UserClass) {
        const error = new Error("Invalid user type");
        error.statusCode = 400;
        throw error;
      }
      const currentUserType = getUserClass(user.role);
      if (!currentUserType) {
        UserClass.create({ id: userId, idUser: userId })
          .then(() => {
            user.update({ role: role });
            if (role == "reviewer") {
              Grade.create({
                id: userId,
                idUser: userId,
              });
            }
            res.status(200).json({ message: "User role updated successfully" });
          })
          .catch((err) => {
            throw err;
          });
      } else {
        currentUserType
          .findOne({ where: { idUser: userId } })
          .then((findedUser) => {
            findedUser.destroy().then(() => {
              UserClass.create({ id: userId, idUser: userId })
                .then(() => {
                  user.update({ role: role });
                  if (role == "reviewer") {
                    Grade.create({
                      id: userId,
                      idUser: userId,
                    });
                  }
                  res
                    .status(200)
                    .json({ message: "User role updated successfully" });
                })
                .catch((err) => {
                  throw err;
                });
            });
          });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

function getUserClass(userType) {
  switch (userType) {
    case "chiefeditor":
      return ChiefEditor;
    case "reviewer":
      return Reviewer;
    case "sectioneditor":
      return SectionEditor;
    case "selectionassistanteditor":
      return SelectionAssistantEditor;
    case "vicepresident":
      return VicePresident;
    default:
      return null;
  }
}
