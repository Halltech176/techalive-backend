const express = require("express");
const dbConnection = require("./DATABASE/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./ROUTES/userRoute");

const app = express();
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

dbConnection();

app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
