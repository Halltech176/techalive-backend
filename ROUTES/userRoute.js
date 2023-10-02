const express = require("express");
const userController = require("../CONTROLLER/userController");
const authController = require("../CONTROLLER/authController");
const { model } = require("mongoose");

const router = express.Router();

router.post("/signup", authController.signup);

module.exports = router;
