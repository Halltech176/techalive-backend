const express = require("express");
const productController = require("../CONTROLLER/productController");
const authController = require("../CONTROLLER/authController");

const router = express.Router();

router.post(
  "/add-product",
  productController.uploadProductImage,
  productController.resizeProductImage,
  productController.postProduct
);

router.get(
  "/all-products",
  authController.protect,
  productController.getAllProducts
);

router.delete(
  "/delete-products",
  authController.protect,
  authController.restrictTo("admin"),
  productController.deleteAllProducts
);

module.exports = router;
