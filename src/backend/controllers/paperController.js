/* in frontend part wee need to use enctype="multipart/form-data" for a form that waits for file 
because file is a binary not text 
also he uses this for form for file
<input type="file" name="paperFile" >*/
const fs = require('fs');
const path = require('path');

const Paper = require("../models/paperModel");

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


  exports.getPaper = (req, res, next) => {
    const paperId = req.params.paperId;
    Paper.findOne({ where: { idPaper: paperId } })
    .then((paper) => {
      const paperFilePath = paper.paperFilePath;
      fs.readFile(paperFilePath, (err, data) => {
        if (err) {
          return next(err);
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
      });
    })
    
  };
