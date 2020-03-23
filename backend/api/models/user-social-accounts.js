const mongoose = require("mongoose");

const userSocialAccounts = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  facebookUserToken: {
    type: String,
    require: false
  },
  instagramUserToken: {
    type: String,
    require: false
  },
  googleUserToken: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model("UserSocialAccounts", userSocialAccounts);
