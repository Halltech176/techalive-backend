const User = require("../MODEL/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(401).json({
        status: "fail",
        message: "Email address already exists.",
      });
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: "Bad Request",
        message: "Fail",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    // const correct = await user.correctPassword(password, user.password)

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "Unauthorized",
        message: "Incorrect email or password",
      });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();

    res.status(200).json({
      message: "Success",
      data: {
        getAllUsers,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
