const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

async function dbConnection() {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("Database connection successful");
    });
}

// useNewUrlParser:true
// useUnifiedTopology:true

module.exports = dbConnection;
