const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const reviewerController = require("../controllers/reviewerController");

router.put("/put-grade/:userId", isAuth, reviewerController.putGrade);
router.put("/put-bid-level/:userId", isAuth, reviewerController.putBidLevel);
router.get("/get-grade/:userId", isAuth, reviewerController.getGrade);
router.get("/get-paper-items/:userId", isAuth, reviewerController.getPaperItems);
module.exports = router;
