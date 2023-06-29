const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const selectionAssistantEditorController = require("../controllers/selectionAssistantEditorController");

router.get(
  "/all-section-editors",
  isAuth,
  selectionAssistantEditorController.getAllSectionEditors
);
router.get(
  "/get-all-chief-editors",
  isAuth,
  selectionAssistantEditorController.getAllChiefEditors
);
router.get(
  "/get-all-reviewers",
  isAuth,
  selectionAssistantEditorController.getAllReviewers
);
router.put(
  "/section-editor-change-section",
  isAuth,
  selectionAssistantEditorController.changeSectionEditorSection
);
router.put(
  "/userrole",
  isAuth,
  selectionAssistantEditorController.changeUserRole
);
router.put(
  "/put-chief-editor",
  isAuth,
  selectionAssistantEditorController.putChiefEditor
);
router.put(
  "/assign-reviewers-by-algo",
  isAuth,
  selectionAssistantEditorController.assignReviewersSection
);
router.put(
  "/assign-papers-by-algo",
  isAuth,
  selectionAssistantEditorController.assignPapersToReviewers
);
router.put(
  "/assign-editoral-by-algo",
  isAuth,
  selectionAssistantEditorController.assignPapersToSectionEditorsChiefEditorsVicePresident
);

router.post(
  "/send-reminder",
  isAuth,
  selectionAssistantEditorController.sendReminder
);

module.exports = router;
