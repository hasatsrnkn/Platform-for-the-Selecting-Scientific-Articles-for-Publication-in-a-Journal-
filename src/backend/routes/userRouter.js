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


module.exports = router;
