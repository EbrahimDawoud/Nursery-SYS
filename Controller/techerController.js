const bcrypt = require("bcryptjs");
const Teacher = require("../Model/teacher");

exports.register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const teacher = await Teacher.create({
      username: req.body.username,
      password: hashedPassword, 
      age: req.body.age,
      image: req.body.image
    });
    

    teacher.password = undefined;

    res.status(201).json({ teacher });
  } catch (err) {

    res.status(500).json({ message: "There is an error", err:`${err.message}` });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const updatedTeacher = await Teacher.find;

    res.status(201).json({ teacher });
  } catch (err) {
    res.status(500).json({ message: "There is an error" });
  }
};
