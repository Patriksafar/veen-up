const express = require("express");

const router = express.Router();
const UserController = require("../controllers/user");
// add new user
router.post("/signup/", UserController.userSignUp);

router.post("/login", UserController.userLogin);

// delete user endpoint
router.delete("/:userId", UserController.userDeleteById);

module.exports = router;
