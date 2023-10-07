const Product = require("../MODEL/productModel");

exports.postProduct = async (req, res) => {
  try {
    const currentDate = new Date();

    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      date: currentDate,
    });

    res.status(201).json({
      status: "Successfull",
      currentDate,
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });

    res.status(200).json({
      status: "Ok",
      total: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({});

    res.status(204).json({
      status: "No content",
      message: `Deleted `,
    });
  } catch (error) {
    console.log("Error", error);
  }
};
