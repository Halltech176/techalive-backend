const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set your account password"],
    unique: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
