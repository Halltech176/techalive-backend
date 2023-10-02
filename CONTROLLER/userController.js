// export.createUser = async (req, res) => {
//     const newUser = await User.create(req.body)

//     res.status(201).json({
//         status: "Success",

//     })
// }

// const User = require("../MODEL/userModel");

// exports.createUser = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);

//     newUser.save();

//     res.status(201).json({
//       status: "success",
//       user: newUser,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
