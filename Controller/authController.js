// const teacher = require('../Model/teacher');
// const jwt = require("jsonwebtoken");

// exports.login = (req, res, next) => {
//     console.log("////////////////////////// inside login")
//     teacher.findOne({
//         email: req.body.email, Password: req.body.Password
//     })
//         .then((result) => {
//             if (result) {

//                 let token = jwt.sign({
//                     username: result.username,
//                     email: result.email, 
//                     role: "admin"
//                 }, process.env.JWT_SECRET, { expiresIn: "1h" });
                
//                 res.status(200).json({ token, result, message: "Logged in successfully" });
//                 next();
//             }
//             else {
//                 let error = new Error("Invalid name or password");
//                 error.statusCode = 401;
//                 throw error; // Or directly call next(error) without throwing
//             }
//         })
//         .catch(err => next(err)); // Properly pass errors to error-handling middleware
// }
const bcrypt = require("bcryptjs");
const Children = require("../Model/children");
const Admin = require("../Model/admin");
const Teacher = require("../Model/teacher");
const jwt = require("jsonwebtoken");
const role = "";
exports.login = async (req, res) => {
  try {
    const adminUser = await Admin.findOne({ email: req.body.email }).select("+password");
    const childUser = await Children.findOne({ fullName: req.body.fullName }).select("+password");
    const teacherUser = await Teacher.findOne({ email: req.body.email }).select("+password");

    if (adminUser) {
      loggedInUser = adminUser;
      loggedInUser.role = "admin";
    } else if (childUser) {
      loggedInUser = childUser;
      loggedInUser.role = "child";
    } else if (teacherUser) {
      loggedInUser = teacherUser;
      loggedInUser.role = "teacher";
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      loggedInUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Password is not correct" });
    }

    loggedInUser.password = undefined;

    const token = jwt.sign(
      { userId: loggedInUser._id, role: loggedInUser.role},
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(201).json({ loggedInUser, token });
  } catch (err) {
    res.status(500).json({ message: "There is an error" });
  }
};
