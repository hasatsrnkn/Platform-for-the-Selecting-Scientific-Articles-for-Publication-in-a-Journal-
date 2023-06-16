/* in frontend part wee need to use enctype="multipart/form-data" for a form that waits for file 
because file is a binary not text 
also he uses this for form for file
<input type="file" name="paperFile" >*/

exports.postAddPaper = (req, res, next) => {
    const idEdition = req.body.idEdition;
    const title = req.body.title;
    const doi = req.body.doi;
    const pmid = req.body.pmid;
    const startPage = req.body.startPage;
    const endPage = req.body.endPage;
    const abstract = req.body.abstract;
    const idJournal = req.body.idJournal;
    const idJournalIssue = req.body.idJournalIssue;
    const paperFile = req.paperFile;
    
  
    const paperFilePath = file.path;
  
    const paper = new Paper({
      idEdition: idEdition,
      title: title,
      doi:doi,
      pmid: pmid,
      startPage: startPage,
      endPage: endPage,
      abstract: abstract,
      idJournal: idJournal,
      idJournalIssue: idJournalIssue,
      paperFilePath: paperFilePath,
    });
    paper
      .save()
      .then(result => {
        console.log(result);
        console.log('Created Paper');
        res.redirect('/papers');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };