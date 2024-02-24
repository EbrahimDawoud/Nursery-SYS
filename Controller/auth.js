const bcrypt = require("bcryptjs");
const Children = require("../Model/children");
const Admin = require("../Model/admin");
const Teacher = require("../Model/teacher");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    let loggedInUser =
      (await Admin.findOne({ username: req.body.username }).select(
        "+password"
      )) ||
      (await Children.findOne({ username: req.body.username }).select(
        "+password"
      )) ||
      (await Teacher.findOne({ username: req.body.username }).select(
        "+password"
      ));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      loggedInUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Password is not correct" });
    }

    loggedInUser.password = undefined;

    const token = jwt.sign(
      { userId: loggedInUser._id },
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
