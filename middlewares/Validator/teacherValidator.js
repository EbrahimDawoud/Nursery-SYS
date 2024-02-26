const { body } = require("express-validator");
const Teacher = require("../../Model/teacher");

exports.teacherInsertArray =
  [
    body("username", "Name must be between 5 and 20 characters")
      .isLength({ min: 5, max: 20 }),

    body("password", "Password must be 8 characters long with at least one uppercase letter, one number, and one special character")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),

    body("age", "Age must be a number")
      .isNumeric(),

    body("email", "Email is not valid")
      .isEmail()
      .normalizeEmail() 
      .custom((value, { req }) => {
        return Teacher.findOne({ email: value }).then(teacher => {
          if (teacher) {
            return Promise.reject('Email already in use');
          }
        });
      }),
  ]
