const mongoose = require("mongoose");

const SocialAccountSchema = mongoose.Schema({
  token: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  }
});

const userSocialAccountsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  facebookAccount: SocialAccountSchema,
  instagramAccount: SocialAccountSchema,
  googleAccount: SocialAccountSchema
});

module.exports = mongoose.model("UserSocialAccounts", userSocialAccountsSchema);
