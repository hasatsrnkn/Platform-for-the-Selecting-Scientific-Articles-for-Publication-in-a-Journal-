const ChiefEditor = require("../models/UserModels/chiefEditorModel");
const Reviewer = require("../models/UserModels/reviewerModel");
const SectionEditor = require("../models/UserModels/sectionEditorModel");
const SelectionAssistantEditor = require("../models/UserModels/selectionAssistantEditorModel");
const User = require("../models/UserModels/userModel");
const VicePresident = require("../models/UserModels/vicePresidentModel");
const Grade = require("../models/gradeModel");
const Section = require("../models/sectionModel");
const Organization = require("../models/OrganizationModels/organizationModel");
const OrganizationItem = require("../models/OrganizationModels/organization-item-Model");

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({
    where: { idUser: userId },
    include: [{ model: Organization }],
  })
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        throw error;
      }
      OrganizationItem.findAll({ where: { userIdUser: userId } }).then(
        (organizationItems) => {
          res.status(200).json({
            message: "User fetched.",
            user: user,
            organizationItems: organizationItems,
          });
        }
      );
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteAccount = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        throw error;
      }
      return user.destroy();
    })
    .then((result) => {
      console.log("DESTROYED USER");
      res.status(200).json({
        message: "User deleted.",
        result: result,
       
      });
    })
    .catch((err) => console.log(err));
};

exports.getAllOrganizations = (req, res, next) => {
  console.log("getting all organizatins");
  Organization.findAll()
    .then((organizations) => {
      if (!organizations) {
        return res.status(404).json({ message: "No organization found!" });
      }
      res.status(200).json({ organizations: organizations });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

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

exports.getAllSectionEditors = (req, res, next) => {
  SectionEditor.findAll({ include: [{ model: Section }, { model: User }] })
    .then((sectionEditors) => {
      if (!sectionEditors) {
        const error = new Error("No section editors");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ users: sectionEditors });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.changeOrganizationEmails = (req, res, next) => {
  const userId = req.body.userId;
  const changedEmails = req.body.changedEmails;
  changedEmails.forEach((changedEmail) => {
    const organizationId = changedEmail.organizationId;
    const newEmail = changedEmail.newEmail;

    OrganizationItem.findOne({
      where: {
        userIdUser: userId,
        organizationIdOrganization: organizationId,
      },
    })
      .then((organizationItem) => {
        if (!organizationItem) {
          const error = new Error("Organization item not found.");
          error.statusCode = 404;
          throw error;
        }

        // Update the organization email
        organizationItem.organizationEmail = newEmail;
        return organizationItem.save();
      })
      .then((updatedOrganizationItem) => {
        res.status(200).json({
          message: "Organization email updated successfully.",
          organizationItem: updatedOrganizationItem,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.postNewOrganization = (req, res, next) => {
  const userId = req.body.userId;
  const organizationName = req.body.organizationName;
  const organizationCountry = req.body.organizationCountry;
  const organizationEmail = req.body.organizationEmail;

  Organization.findOne({
    where: { name: organizationName, country: organizationCountry },
  }).then((organization) => {
    if (!organization) {
      Organization.create({
        name: organizationName,
        country: organizationCountry,
      }).then((newOrganization) => {
        OrganizationItem.create({
          organizationEmail: organizationEmail,
          userIdUser: userId,
          organizationIdOrganization: newOrganization.idOrganization,
        })
          .then((organizationitem) => {
            console.log("Organization created successfully");
            return res.status(201).json({
              message: "Organization created!",
              organizationItem: organizationitem,
            });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      });
    } else {
      OrganizationItem.create({
        organizationEmail: organizationEmail,
        userIdUser: userId,
        organizationIdOrganization: organization.idOrganization,
      })
        .then((organizationitem) => {
          console.log("Organization created successfully");
          return res.status(201).json({
            message: "Organization created!",
            organizationItem: organizationitem,
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  });
};

exports.changeSectionEditorSection = (req, res, next) => {
  const userId = req.body.userId;
  const sectionId = req.body.sectionId;
  SectionEditor.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }

      if (!sectionId) {
        const error = new Error("No section");
        error.statusCode = 404;
        throw error;
      }

      user.update({ idSection: sectionId });
      return res
        .status(201)
        .json({ message: "Section is changed successfully!" });
    })
    .catch((err) => {
      throw err;
    });
};

exports.getSectionId = (req, res, next) => {
  const userId = req.params.userId;
  console.log("userId is " + userId);
  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }
      const UserClass = getUserClass(user.role);
      if (!UserClass) {
        const error = new Error("Invalid user type");
        error.statusCode = 400;
        throw error;
      }
      UserClass.findOne({ where: { idUser: userId } })
        .then((foundUser) => {
          if (!foundUser) {
            const error = new Error("No user");
            error.statusCode = 404;
            throw error;
          }
          res.status(200).json({ sectionId: foundUser.idSection });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
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
