const Product = require("../MODEL/productModel");

exports.postProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
    });

    res.status(201).json({
      status: "Successfull",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log("Error:", err);
  }
};
