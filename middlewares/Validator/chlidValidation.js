const { body } = require("express-validator");
const Child = require("../../Model/children");

exports.childInsertArray =
    [
        body("_id", "id must be unique")
            .custom((value, { req }) => {
                return Child.findOne({ _id: value })
                    .then(child => {
                        if (child) {
                            return Promise.reject('id already in use');
                        }
                    })
            }),
        body("fullName", "Name must be between 5 and 20 characters")
            .isLength({ min: 5, max: 20 }),
        body("fullName", "u have signed up before")
            .custom((value, { req }) => {
                return Child.findOne({ fullName: value }).then(child => {
                    if (child) {
                        return Promise.reject('this Name already in use');
                    }
                });
            }),

        body("age", "Age must be a number and between 3 and 6 years old")
            .isNumeric()
            .isFloat({ min: 3, max: 6 }),



    ]
