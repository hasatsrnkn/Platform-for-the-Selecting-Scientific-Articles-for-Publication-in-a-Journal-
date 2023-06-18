/* in frontend part wee need to use enctype="multipart/form-data" for a form that waits for file 
because file is a binary not text 
also he uses this for form for file
<input type="file" name="paperFile" >*/
const fs = require("fs");
const path = require("path");

const Paper = require("../models/paperModel");
const User = require("../models/UserModels/userModel");
const ChiefEditor = require("../models/UserModels/chiefEditorModel");
const Reviewer = require("../models/UserModels/reviewerModel");
const SectionEditor = require("../models/UserModels/sectionEditorModel");
const SelectionAssistantEditor = require("../models/UserModels/selectionAssistantEditorModel");
const VicePresident = require("../models/UserModels/vicePresidentModel");

exports.postAddPaper = (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    const error = new Error("No file provided.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const authors = req.body.authors;
  const doi = req.body.doi;
  const pmid = req.body.pmid;
  const abstract = req.body.abstract;
  const idJournal = req.body.idJournal;
  const idJournalIssue = req.body.idJournalIssue;
  const paperFilePath = req.file.path;
  const idSection = req.body.idSection;
  Paper.create({
    title: title,
    authors: authors,
    doi: doi,
    pmid: pmid,
    abstract: abstract,
    idJournal: idJournal,
    idJournalIssue: idJournalIssue,
    paperFilePath: paperFilePath,
    idSection: idSection,
  })
    .then((paper) => {
      console.log("paper created successfully");
      return res
        .status(201)
        .json({ message: "paper created!", idPaper: paper.idPaper });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPaper = (req, res, next) => {
  const paperId = req.params.paperId;
  console.log("start of downloading paper" + paperId)
  Paper.findOne({ where: { idPaper: paperId } }).then((paper) => {
    const paperFilePath = paper.paperFilePath;
    fs.readFile(paperFilePath, (err, data) => {
      if (err) {
        return next(err);
      }
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    });
  });
};

exports.getAllPapers = (req, res, next) => {
  Paper.findAll()
    .then((papers) => {
      if (!papers) {
        const error = new Error("No users");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ papers: papers });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSectionPapers = (req, res, next) => {
  const userId = req.params.userId;

  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No users");
        error.statusCode = 404;
        throw error;
      }
      const currentUserType = getUserClass(user.role);
      if (!currentUserType) {
        const error = new Error("Invalid user type");
        error.statusCode = 400;
        throw error;
      }
      currentUserType
        .findOne({ where: { idUser: userId } })
        .then((foundUser) => {
          if (!foundUser) {
            const error = new Error("Invalid user type");
            error.statusCode = 400;
            throw error;
          }
          const idSection = foundUser.idSection;
          Paper.findAll({ where: { idSection: idSection } })
            .then((papers) => {
              if (!papers) {
                const error = new Error("No papers");
                error.statusCode = 404;
                throw error;
              }
              res.status(200).json({ papers: papers });
            })
            .catch((err) => {
              if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
            });
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
