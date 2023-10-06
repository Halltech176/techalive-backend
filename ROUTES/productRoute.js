const express = require("express");
const productController = require("../CONTROLLER/productController");

const router = express.Router();

router.post("/add-product", productController.postProduct);

module.exports = router;
