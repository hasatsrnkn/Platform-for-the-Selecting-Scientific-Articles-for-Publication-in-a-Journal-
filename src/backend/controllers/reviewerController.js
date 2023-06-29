const Reviewer = require("../models/UserModels/reviewerModel");
const Grade = require("../models/gradeModel");
const { validationResult } = require("express-validator");
const PaperItem = require("../models/PaperModels/paper-item-Model");
const Paper = require("../models/PaperModels/paperModel");

exports.putGrade = (req, res, next) => {
  const userId = req.params.userId;

  const grade1 = req.body.grade1;
  const grade2 = req.body.grade2;
  const grade3 = req.body.grade3;
  const grade4 = req.body.grade4;
  const grade5 = req.body.grade5;
  const grade6 = req.body.grade6;
  const grade7 = req.body.grade7;
  const grade8 = req.body.grade8;
  const grade9 = req.body.grade9;
  const grade10 = req.body.grade10;
  const grade11 = req.body.grade11;
  const grade12 = req.body.grade12;
  const grade13 = req.body.grade13;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  Reviewer.findOne({ where: { id: userId, idUser: userId } }).then(
    (reviewer) => {
      if (!reviewer) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }
      Grade.findOne({ where: { id: userId, idUser: userId } })
        .then((grade) => {
          grade.update({
            grade1: grade1,
            grade2: grade2,
            grade3: grade3,
            grade4: grade4,
            grade5: grade5,
            grade6: grade6,
            grade7: grade7,
            grade8: grade8,
            grade9: grade9,
            grade10: grade10,
            grade11: grade11,
            grade12: grade12,
            grade13: grade13,
          });
        })
        .then(() => {
          res.status(200).json({ message: "Grade added successfully" });
        })
        .catch((err) => {
          throw err;
        });
    }
  );
};

exports.getGrade = (req, res, next) => {
  const userId = req.params.userId;

  Grade.findOne({ where: { id: userId, idUser: userId } })
    .then((grade) => {
      if (!grade) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "User fetched.", grade: grade });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putBidLevel = (req, res, next) => {
  const userId = req.params.userId;
  const bidLevel = req.body.bidLevel;
  const paperId = req.body.paperId;

  PaperItem.findOne({ where: { userIdUser: userId, paperIdPaper: paperId } })
    .then((paperItem) => {
      if (!paperItem) {
        PaperItem.create({
          reviewed: false,
          assigned: false,
          bidLevel: bidLevel,
          userIdUser: userId,
          paperIdPaper: paperId,
        });
      } else {
        paperItem.update({ bidLevel: bidLevel });
      }
      res.status(200).json({ message: "Bid Level updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPaperItems = (req, res, next) => {
  const userId = req.params.userId;

  PaperItem.findAll({ where: { userIdUser: userId } })
    .then((paperItems) => {
      res.status(200).json({ paperItems: paperItems });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

