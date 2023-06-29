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
const Review = require("../models/reviewModel");
const PaperItem = require("../models/PaperModels/paper-item-Model");
const Paper = require("../models/PaperModels/paperModel");

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

exports.getAllSections = (req, res, next) => {
  console.log("getting all organizatins");
  Section.findAll()
    .then((sections) => {
      if (!sections) {
        return res.status(404).json({ message: "No section found!" });
      }
      res.status(200).json({ sections: sections });
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

exports.getSectionId = (req, res, next) => {
  const userId = req.params.userId;
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

exports.makeFullReview = (req, res, next) => {
  const userId = req.body.userId;
  const paperId = req.body.paperId;
  const topicImportance = req.body.topicImportance;
  const include = req.body.include;
  const scientificPracticalImpact = req.body.scientificPracticalImpact;
  const scientificContent = req.body.scientificContent;
  const originality = req.body.originality;
  const literature = req.body.literature;
  const presentation = req.body.presentation;
  const comment = req.body.comment;

  Review.findOne({ where: { idUser: userId, idPaper: paperId } })
    .then((review) => {
      if (!review) {
        Review.create({
          topicImportance: topicImportance,
          include: include,
          scientificContent: scientificContent,
          scientificPracticalImpact: scientificPracticalImpact,
          originality: originality,
          literature: literature,
          presentation: presentation,
          comment: comment,
          fullReview: true,
          idPaper: paperId,
          idUser: userId,
        }).then((createdPaper) => {
          PaperItem.findOne({
            where: { userIdUser: userId, paperIdPaper: paperId },
          }).then((paperItem) => {
            if (!paperItem) {
              PaperItem.create({
                userIdUser: userId,
                paperIdPaper: paperId,
                assigned: true,
                reviewed: true,
              });
            } else {
              paperItem.update({
                reviewed: true,
              });
            }
          });
        });
        res.status(200).json({ review: review });
      } else {
        review
          .update({
            topicImportance: topicImportance,
            include: include,
            scientificContent: scientificContent,
            scientificPracticalImpact: scientificPracticalImpact,
            originality: originality,
            literature: literature,
            presentation: presentation,
            comment: comment,
            fullReview: true,
            idPaper: paperId,
            idUser: userId,
          })
          .then((updatedReview) => {
            res.status(200).json({ review: updatedReview });
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

exports.makeLightReview = (req, res, next) => {
  const userId = req.body.userId;
  const paperId = req.body.paperId;
  const include = req.body.include;
  const comment = req.body.comment;

  Review.findOne({ where: { idUser: userId, idPaper: paperId } })
    .then((review) => {
      if (!review) {
        Review.create({
          include: include,
          comment: comment,
          fullReview: false,
          idPaper: paperId,
          idUser: userId,
        }).then((createdPaper) => {
          PaperItem.findOne({
            where: { userIdUser: userId, paperIdPaper: paperId },
          }).then((paperItem) => {
            if (!paperItem) {
              PaperItem.create({
                userIdUser: userId,
                paperIdPaper: paperId,
                assigned: true,
                reviewed: true,
              });
            } else {
              paperItem.update({
                reviewed: true,
              });
            }
          });
        });
        res.status(200).json({ review: review });
      } else {
        review
          .update({
            include: include,
            comment: comment,
            fullReview: false,
            idPaper: paperId,
            idUser: userId,
          })
          .then((updatedReview) => {
            res.status(200).json({ review: updatedReview });
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

exports.getReview = (req, res, next) => {
  const userId = req.params.userId;
  const paperId = req.params.paperId;

  Review.findOne({ where: { idUser: userId, idPaper: paperId } })
    .then((review) => {
      res.status(200).json({ review: review });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllReviewsOfAPaper = (req, res, next) => {
  const paperId = req.params.paperId;
  Review.findAll({
    where: { idPaper: paperId },
    include: [{ model: User }, { model: Paper }],
  })
    .then((reviews) => {
      if (!reviews) {
        return res.status(404).json({ message: "No review found!" });
      }
      res.status(200).json({ reviews: reviews });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAssignedPapers = (req, res, next) => {
  const userId = req.params.userId;
  const papers = [];

  PaperItem.findAll({ where: { userIdUser: userId, assigned: true } })
    .then((paperItems) => {
      const paperPromises = paperItems.map((paperItem) => {
        return Paper.findOne({ where: { idPaper: paperItem.paperIdPaper } });
      });

      Promise.all(paperPromises)
        .then((result) => {
          papers.push(...result);
          res.status(200).json({ paperItems: paperItems, papers: papers });
        })
        .catch((err) => {
          throw err;
        });
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
