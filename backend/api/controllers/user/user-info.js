const jwtDecode = require("jwt-decode");
const User = require("../../models/user");
const UserSocialAccounts = require("../../models/user-social-accounts");

exports.userInfo = (req, res) => {
  const decoded = jwtDecode(req.headers.authorization);

  User.find({ _id: decoded.id })
    .exec()
    .then(userInfo => {
      UserSocialAccounts.find({ userId: decoded.id })
        .exec()
        .then(social => {
          res.status(201).json({
            user: userInfo,
            socialAccounts: social
          });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        error: { message: "Oppps somethin went wrong!" }
      });
    });
};
