
const bcrypt = require("bcryptjs");
const Teacher = require("../Model/teacher");
const Children = require("../Model/children");
const Admin = require('../Model/admin');
const jwt = require("jsonwebtoken");
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
      { userId: loggedInUser._id,userName:loggedInUser.username, role: loggedInUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "4d",
      }
    );
    res.status(201).json({ loggedInUser, token });

  } catch (err) {
    res.status(500).json({ message: "filed to Login" });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = await Teacher.findById(req.user.userId).select("+password");
    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Password is not correct" });
    }

    user.password = req.body.newPassword;
    await user.save();
    res.status(201).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "There is an error" });
  }
}
