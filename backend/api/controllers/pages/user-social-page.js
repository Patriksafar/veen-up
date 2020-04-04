/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
const mongoose = require("mongoose");
const jwtDecode = require("jwt-decode");

const UserSocialPage = require("../../models/user-social-page");

exports.addUserSocialPages = (req, res) => {
  const decoded = jwtDecode(req.headers.authorization);
  const userId = decoded.id;
  const { enumType, name, token, image } = req.body;

  if (enumType && name && token) {
    // create new user...
    const userSocialPage = new UserSocialPage({
      _id: new mongoose.Types.ObjectId(),
      userId,
      enum: enumType,
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
  UserSocialPage.find({ userId: decoded.id })
    .then((docs) => {
      if (docs) {
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
