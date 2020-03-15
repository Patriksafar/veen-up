const express = require("express");
const mongoose = require("mongoose");
const Products = require("../models/products");

const router = express.Router();

router.get("/", (request, response) => {
  Products.find()
    .exec()
    .then(docs => {
      console.log(docs);
      response.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      response.status(404).json({
        error: { message: "Oppps something went wrong" }
      });
    });
});

router.post("/", (request, response) => {
  const product = new Products({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      response.status(201).json({
        message: "hanldling POST request /products/",
        createdProduct: product
      });
    })
    .catch(err => {
      response.status(500).json({
        error: err
      });
    });
});

router.get("/:productsId", (request, response) => {
  const { productsId } = request.params;

  // also Products({_id: productsId}) should work
  Products.findById(productsId)
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
});

module.exports = router;
