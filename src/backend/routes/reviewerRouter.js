const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const reviewerController = require("../controllers/reviewerController");

router.put("/put-grade/:userId", isAuth, reviewerController.putGrade);
router.get("/get-grade/:userId", isAuth, reviewerController.getGrade);
module.exports = router;
