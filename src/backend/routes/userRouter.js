const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/userController");

router.get("/all-users", isAuth, userController.getAllUsers);
router.put("/userrole", isAuth, userController.changeUserRole );
module.exports = router;
