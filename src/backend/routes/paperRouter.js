const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const paperController = require("../controllers/paperController");

router.get('papers/:paperId', isAuth, paperController.getPaper); // for downloading paper 

module.exports = router;
