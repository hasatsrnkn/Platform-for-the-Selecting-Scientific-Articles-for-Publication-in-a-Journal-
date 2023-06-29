const express = require("express");
const router = express.Router();
const User = require("../models/UserModels/userModel");

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/userController");

router.get("/all-users", isAuth, userController.getAllUsers);
router.get("/profile/:userId", isAuth, userController.getProfile);
router.get("/get-sectionid/:userId", isAuth, userController.getSectionId);
router.get("/get-all-organizations", isAuth, userController.getAllOrganizations);
router.post("/post-new-organization",isAuth, userController.postNewOrganization);
router.put("/change-organization-emails", isAuth, userController.changeOrganizationEmails);
router.post("/delete-account/:userId", isAuth, userController.deleteAccount);
router.get("/get-all-sections", isAuth, userController.getAllSections);
router.put("/make-full-review", isAuth, userController.makeFullReview);
router.put("/make-light-review", isAuth, userController.makeLightReview);
router.get("/get-one-review/:userId/:paperId", isAuth, userController.getReview);
router.get("/get-all-reviews-of-a-paper/:paperId",isAuth, userController.getAllReviewsOfAPaper);
router.get("/get-assigned-papers/:userId", isAuth, userController.getAssignedPapers);


module.exports = router;
