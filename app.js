const express = require("express");
const dbConnection = require("./DATABASE/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Routes
const userRoute = require("./ROUTES/userRoute");
const productRoute = require("./ROUTES/productRoute");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  //   console.log(req.headers);

  next();
});

dbConnection();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
