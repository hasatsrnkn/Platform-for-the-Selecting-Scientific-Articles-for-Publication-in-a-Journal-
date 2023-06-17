const express = require("express");
const router = express.Router();
const User = require("../models/UserModels/userModel");

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/userController");

router.get("/all-users", isAuth, userController.getAllUsers);
router.put("/userrole", isAuth, userController.changeUserRole );
router.get("/all-section-editors",isAuth, userController.getAllSectionEditors);
router.put("/section-editor-change-section", isAuth, userController.changeSectionEditorSection);

module.exports = router;
