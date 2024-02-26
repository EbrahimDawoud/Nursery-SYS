const { body } = require("express-validator");
const Child = require("../../Model/children");

exports.updateChildArray =
    [
        body("assignedClass", "classes between 1 to 12")
            .isNumeric()
            .isFloat({ min: 1, max: 12 }),
        body("password", "password must be at least 3 characters")
            .isLength({ min: 3 }),
    ]
