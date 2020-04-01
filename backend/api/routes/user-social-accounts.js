const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const UserSocialAccounts = require("../controllers/user-social-accounts");
// add new user
router.post("/", checkAuth, UserSocialAccounts.createUserSocialAccounts);

router.get("/", checkAuth, UserSocialAccounts.getAccountsByUserId);

module.exports = router;
