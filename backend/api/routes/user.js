const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const UserController = require("../controllers/user/user");
const UserInfoController = require("../controllers/user/user-info");

// add new user
router.post("/signup/", UserController.userSignUp);

router.post("/login", UserController.userLogin);

router.get("/info", checkAuth, UserInfoController.userInfo);

// delete user endpoint
router.delete("/:userId", checkAuth, UserController.userDeleteById);

module.exports = router;
