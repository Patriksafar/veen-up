const express = require("express");

const router = express.Router();

router.post("/", (request, response) => {
  const fields = {
    login: request.body.login,
    password: request.body.password
  };

  if (fields && fields.login && fields.password) {
    response.status(201).json({
      message: "Success",
      userId: "1010101010101"
    });
  } else {
    response.status(201).json({
      error: { message: "Invalid email or password" }
    });
  }
});

module.exports = router;
