const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const paperController = require("../controllers/paperController");


router.get('papers/:paperId', isAuth, paperController.getPaper); // for downloading paper 
router.post("/post-paper", isAuth, paperController.postAddPaper);
module.exports = router;
