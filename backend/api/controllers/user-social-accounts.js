const mongoose = require("mongoose");
const UserSocialAccounts = require("../models/user-social-accounts");

exports.createUserSocialAccounts = (request, response) => {
  const google = request.body.google ? {
    token: request.body.google.token,
    name: request.body.google.name,
    email: request.body.google.email,
  } : {}

  const instagram = request.body.instagram ? {
    token: request.body.instagram.token,
    name: request.body.instagram.name,
    email: request.body.instagram.email,
  } : {}

  const facebook = request.body.facebook ? {
    token: request.body.facebook.token,
    name: request.body.facebook.name,
    email: request.body.facebook.email
  } : {}

  const socialAccounts = new UserSocialAccounts({
    _id: new mongoose.Types.ObjectId(),
    userId: request.body.userId,
    facebookAccount: facebook,
    instagramAccount: instagram,
    googleAccount: google
  });

  socialAccounts
    .save()
    .then(result => {
      console.log(result);
      response.status(201).json({
        message: "hanldling POST request /social accounts/",
        connectedSocialAccounts: socialAccounts
      });
    })
    .catch(err => {
      response.status(500).json({
        error: err
      });
    });
};

exports.getAccountsByUserId = (request, response) => {
  const { userId } = request.params;

  UserSocialAccounts.find({ userId })
    .exec()
    .then(doc => {
      console.log("From server", doc);
      if (doc) {
        response.status(200).json(doc);
      } else {
        response.status(404).json({
          message: "No results found for provided `id`"
        });
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err });
    });
};
