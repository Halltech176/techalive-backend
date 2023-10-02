const express = require("express");
const dbConnection = require("./DATABASE/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const newUser = require("./ROUTES/userRoute");

const app = express();
const PORT = process.env.PORT || 3000;
dbConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1/signup", newUser);

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
