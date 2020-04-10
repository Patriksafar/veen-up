/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
const mongoose = require("mongoose");
const jwtDecode = require("jwt-decode");
const axios = require("axios");
const UserSocialPage = require("../../models/user-social-page");
const UserSocialAccounts = require("../../models/user-social-accounts");

exports.addUserSocialPages = (req, res) => {
  const decoded = jwtDecode(req.headers.authorization);
  const userId = decoded.id;
  const { enumType, name, token, image } = req.body;

  if (enumType && name && token) {
    // create new user...
    const userSocialPage = new UserSocialPage({
      _id: new mongoose.Types.ObjectId(),
      userId,
      type: enumType,
      name,
      token,
      image,
    });

    userSocialPage
      .save()
      .then((response) => {
        if (response) {
          return res.status(201).json({
            message: "Page is now linked to your profile",
            page: userSocialPage,
          });
        }
      })
      .catch(
        (error) =>
          res.status(201).json({
            error: {
              message: error,
            },
          })
        // eslint-disable-next-line function-paren-newline
      );
  } else {
    res.status(201).json({
      error: {
        message: "some field is probably missing!",
      },
    });
  }
};

// get pages of signed user
exports.getSocialPageByUserId = (req, res) => {
  const decoded = jwtDecode(req.headers.authorization);
  const query = {
    userId: decoded.id,
  };

  if (req.query.type) {
    query.type = req.query.type;
  }

  UserSocialPage.find(query)
    .then((docs) => {
      if (docs) {
        console.log("from server: ", docs);
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No results",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        error: err,
      });
    });
};

exports.getSocialPageById = (req, res) => {
  // create new user...
  const { pageId } = req.params;

  UserSocialPage.findById(pageId)
    .then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No results found for provided `id`",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getNotConnectedFacebookPages = (req, res) => {
  const decoded = jwtDecode(req.headers.authorization);

  // get user access token and id from DB
  UserSocialAccounts.find({ userId: decoded.id }).then((accounts) => {
    if (accounts[0].facebookAccount) {
      const { token, accountUserId } = accounts[0].facebookAccount;
      axios
        .get(
          `https://graph.facebook.com/${accountUserId}/accounts?fields=access_token,picture,name,link&access_token=${token}`
        )
        .then((response) => {
          const userFacebookPages = response.data.data;

          // get list of allready connected facebook pages
          UserSocialPage.find({ userId: decoded.id, type: "Facebook" })
            .then((docs) => {
              const allreadyConnected = docs;
              const notConnected = [];

              userFacebookPages.map((facebookPage, index) => {
                const shouldBeRendered =
                  allreadyConnected &&
                  allreadyConnected
                    .map((e) => e.name)
                    .indexOf(facebookPage.name);

                if (shouldBeRendered === -1) {
                  notConnected.push(facebookPage);
                }
              });

              res.status(200).json({
                token,
                accountUserId,
                connected: allreadyConnected,
                notConnected,
              });
            })
            .catch((err) => {
              res.status(404).json({
                error: err,
              });
            });
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    } else {
      res
        .status(200)
        .json({ error: "You don't have any facebook account connected yet" });
    }
  });
};

exports.pageDeleteById = (req, res) => {
  const decoded = jwtDecode(req.headers.authorization);
  const userId = decoded.id;

  UserSocialPage.findOneAndRemove({ _id: req.params.pageId })
    .then(() => {
      UserSocialPage.find({ userId })
        .then((docs) => {
          res.status(200).json({
            message: "Page has been unconnected",
            pages: docs,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
