const express = require("express");
const productController = require("../CONTROLLER/productController");

const router = express.Router();

router.post(
  "/add-product",
  productController.uploadProductImage,
  productController.resizeProductImage,
  productController.postProduct
);

router.get("/all-products", productController.getAllProducts);

router.delete("/delete-products", productController.deleteAllProducts);

module.exports = router;
