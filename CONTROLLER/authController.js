const { promisify } = require("util");
const User = require("../MODEL/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../UTILS/appErrors");
const catchAsync = require("../UTILS/catchAsync");

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

    const newUser = await User.create(
      // {
      // name: req.body.name,
      // email: req.body.email,
      // password: req.body.password,

      // }
      req.body
    );

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

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the if the token exist
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please login", 401));
  }

  // 2) Verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user ztill exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("The user is not longer exists", 401));
  }

  // 4) Check if the user change the password after token was issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      res.status(401).json({
        status: "Unauthorized",
        message: "Please login again",
      })
    );
  }

  // Grant Access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          status: "Forbidden",
          message: "You can't perform this action",
        })
      );
    }

    next();
  };
};
