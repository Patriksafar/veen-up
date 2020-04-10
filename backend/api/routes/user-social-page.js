const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const UserSocialPageController = require("../controllers/pages/user-social-page");

// add new user
router.post("/new", checkAuth, UserSocialPageController.addUserSocialPages);

// get pages of user
router.get("/me", checkAuth, UserSocialPageController.getSocialPageByUserId);

router.get(
  "/facebook",
  checkAuth,
  UserSocialPageController.getNotConnectedFacebookPages
);

router.get("/:pageId/", checkAuth, UserSocialPageController.getSocialPageById);

router.delete("/:pageId", checkAuth, UserSocialPageController.pageDeleteById);

module.exports = router;
