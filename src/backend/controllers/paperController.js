/* in frontend part wee need to use enctype="multipart/form-data" for a form that waits for file 
because file is a binary not text 
also he uses this for form for file
<input type="file" name="paperFile" >*/
const fs = require("fs");
const path = require("path");

const Paper = require("../models/PaperModels/paperModel");
const User = require("../models/UserModels/userModel");
const ChiefEditor = require("../models/UserModels/chiefEditorModel");
const Reviewer = require("../models/UserModels/reviewerModel");
const SectionEditor = require("../models/UserModels/sectionEditorModel");
const SelectionAssistantEditor = require("../models/UserModels/selectionAssistantEditorModel");
const VicePresident = require("../models/UserModels/vicePresidentModel");
const Section = require("../models/sectionModel");
const Review = require("../models/reviewModel");

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
  const journalName = req.body.journalName;
  const journalIssue = req.body.journalIssue;
  const paperFilePath = req.file.path;
  const idSection = req.body.idSection;
  Paper.create({
    title: title,
    authors: authors,
    doi: doi,
    pmid: pmid,
    abstract: abstract,
    journalName: journalName,
    journalIssue: journalIssue,
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
  console.log("start of downloading paper" + paperId);
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
  Paper.findAll({ include: [{ model: Section }] })
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

exports.getSectionsBestPapers = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ where: { idUser: userId } });
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
    const foundUser = await currentUserType.findOne({
      where: { idUser: userId },
    });
    if (!foundUser) {
      const error = new Error("Invalid user type");
      error.statusCode = 400;
      throw error;
    }
    const idSection = foundUser.idSection;
    const papers = await createSectionPapers(idSection);
    if (papers.length > 0) {
      const sortedPapers = await sortPapers(papers);
      return res.status(200).json({ papers: sortedPapers });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    next(error);
  }
};

exports.sortBestPapers = async (req, res, next) => {
  let papers = await createPapers();

  if (papers.length > 0) {
    papers = await sortPapers(papers);
    return res.status(200).json({ papers: papers });
  }
};

async function sortPapers(papers) {
  papers.sort((a, b) => {
    const currentAverageA = a.average;
    const currentAverageB = b.average;
    return currentAverageB - currentAverageA;
  });
  return papers;
}

async function createSectionPapers(idSection) {
  const papers = [];
  const allPapers = await Paper.findAll({ where: { idSection: idSection } });

  for (const paper of allPapers) {
    let reviewsOfThePaper = await Review.findAll({
      where: { idPaper: paper.idPaper },
    });
    let count = 0;
    let sum = 0;
    for (const review of reviewsOfThePaper) {
      if (review.fullReview) {
        sum =
          sum +
          review.topicImportance +
          review.include +
          review.scientificPracticalImpact +
          review.scientificContent +
          review.originality +
          review.literature +
          review.presentation;
      } else {
        sum = sum + review.include;
      }
      count++;
    }
    papers.push({ paper: paper, average: sum / count });
  }
  return papers;
}

async function createPapers() {
  const papers = [];
  const allPapers = await Paper.findAll();

  for (const paper of allPapers) {
    let reviewsOfThePaper = await Review.findAll({
      where: { idPaper: paper.idPaper },
    });
    let count = 0;
    let sum = 0;
    for (const review of reviewsOfThePaper) {
      if (review.fullReview) {
        sum =
          sum +
          review.topicImportance +
          review.include +
          review.scientificPracticalImpact +
          review.scientificContent +
          review.originality +
          review.literature +
          review.presentation;
      } else {
        sum = sum + review.include;
      }
      count++;
    }
    papers.push({ paper: paper, average: sum / count });
  }
  return papers;
}

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
