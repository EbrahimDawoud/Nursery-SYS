const { body } = require("express-validator");
const Class = require("../../Model/class");

exports.classInsertArray =
    [
        body("name")
            .isString().
            withMessage("Full Name must be a string")
            .isLength({ min: 3, max: 50 }).withMessage("Full Name must be between 3 to 50 characters")
            .custom((value, { req }) => {
                return Class.findOne({ name: value }).then(C => {
                    if (C) {
                        return Promise.reject('this Name already in use');
                    }
                });
            }),
        body("supervisor")
            .isString()
            .withMessage("Supervisor must be a string"),
        body("supervisor")
            .custom((value, { req }) => {
                return Class.findOne({ supervisor: value }).then(C => {
                    if (C) {
                        return Promise.reject('This superVisor is assigned to class before');
                    }
                });
            }),
        body("children").isArray().withMessage("Children must be an array of Numbers"),

    ]
