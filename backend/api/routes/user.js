const express = require("express");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

// add new user
router.post("/signup/", (req, res) => {
  // check if email already is registered
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length >= 1) {
        return res.status(409).json({
          error: {
            message: "User with this email already exists"
          }
        });
      }

      // if email is free to register we can hash password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(201).json({
            error: err
          });
        }

        // create new user...
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash
        });

        // and save new user to database
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "User created"
            });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error });
          });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length > 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        if (result) {
          const token = jwt.sign(
            // eslint-disable-next-line no-underscore-dangle
            { email: users[0].email, id: users[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(201).json({
            message: "Auth successful",
            token
          });
        }

        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

// delete user endpoint
router.delete("/:userId", (req, res) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

module.exports = router;
