const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./api/routes/user");
const connectedAccountsRoutes = require("./api/routes/user-social-accounts");
const socialPageRoutes = require("./api/routes/user-social-page");

const { mongoConnect } = require("./config");

const app = express();

mongoose.connect(mongoConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// loggign response status to console
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allowing headers for all requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Authorization, Content-Type"
  );

  // If browser provides OPTIONS method we set Method header
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, DELETE, GET, POST, PATCH");
    return res.status(200).json({});
  }

  next();
});

// route - endpoints definitions singup/signin and so on
app.use("/user", userRoutes);
app.use("/connected-accounts", connectedAccountsRoutes);
app.use("/social-page", socialPageRoutes);

// error handaling of requests
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
