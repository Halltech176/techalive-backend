const express = require("express");
const userController = require("../CONTROLLER/userController");
const { model } = require("mongoose");

const route = express.Router();

route.route("/").post(userController.createUser);

module.exports = route;
