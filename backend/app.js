const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/user");

const { mongoConntect } = require("./config");

const app = express();

console.log(mongoConntect);

mongoose.connect(mongoConntect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
app.use("/products", productRoutes);
app.use("/user", userRoutes);

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
      message: error.message
    }
  });
});

module.exports = app;
