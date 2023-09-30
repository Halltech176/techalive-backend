const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Full name is Required"],
    unique: false,
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
    unique: true,
  },
  phone: {
    type: Number,
    require: [true, "Phone number is Required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is Required"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
