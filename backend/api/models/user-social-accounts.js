const mongoose = require("mongoose");

const userSocialAccounts = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  facebookAccount: {
    token: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  instagramAccount: {
    token: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  googleAccount: {
    token: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    }
  }
});

module.exports = mongoose.model("UserSocialAccounts", userSocialAccounts);
