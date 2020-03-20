const express = require("express");
const checkAuth = require("../middleware/check-auth");
const ProductsControllers = require("../controllers/products");

const router = express.Router();

router.get("/", checkAuth, ProductsControllers.productsGetAll);

router.post("/", ProductsControllers.productsCreate);

router.get("/:productsId", ProductsControllers.productsGetById);

module.exports = router;
