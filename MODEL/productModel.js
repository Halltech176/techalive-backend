const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Procduct price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  date: {
    type: Date,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
