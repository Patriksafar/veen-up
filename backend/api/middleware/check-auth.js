const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // this threw error if fail
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    // else we set userData
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};
