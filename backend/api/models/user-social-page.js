const mongoose = require("mongoose");

const userSocialPageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, require: true },
  type: {
    type: String,
    enum: ["Facebook", "Twitter", "Instagram"],
    require: true,
  },
  name: { type: String, require: true },
  token: { type: String, require: true },
  image: String,
});

module.exports = mongoose.model("UserSocialPages", userSocialPageSchema);
