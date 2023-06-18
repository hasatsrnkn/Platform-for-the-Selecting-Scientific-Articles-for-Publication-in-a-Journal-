const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const paperController = require("../controllers/paperController");

router.get("/get-paper/:paperId", isAuth, paperController.getPaper); // for downloading paper
router.get("/get-all-papers", isAuth, paperController.getAllPapers);
router.get(
  "/get-section-paper/:userId",
  isAuth,
  paperController.getSectionPapers
);
router.post("/post-paper", isAuth, paperController.postAddPaper);

module.exports = router;
