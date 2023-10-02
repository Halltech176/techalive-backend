const mongoose = require("mongoose");

// const UserSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required"],
//     unique: false,
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Set your account password"],
//     unique: false,
//   },
// });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
