const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full name is Required"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
