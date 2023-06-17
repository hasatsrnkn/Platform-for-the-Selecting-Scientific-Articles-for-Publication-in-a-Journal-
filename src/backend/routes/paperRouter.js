const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const paperController = require("../controllers/paperController");

router.post("/post-paper", isAuth, paperController.postAddPaper);

module.exports = router;
