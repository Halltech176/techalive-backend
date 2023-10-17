const Product = require("../MODEL/productModel");
const multer = require("multer");
const sharp = require("sharp");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/products");
//   },
//   filename: (req, file, cb) => {
//     const extension = file.mimetype.split("/")[1];
//     cb(
//       null,
//       `product-${req.body.name.replace(/ /g, "")}-${Date.now()}.${extension}`
//     );
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.single("image");

exports.resizeProductImage = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${req.body.name.replace(
    / /g,
    ""
  )}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`public/img/products/${req.file.filename}`);

  next();
};

exports.postProduct = async (req, res) => {
  try {
    const currentDate = new Date();

    const newProduct = await Product.create({
      image: req.file.filename,
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

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate();
  } catch (error) {
    console.log(error);
  }
};
