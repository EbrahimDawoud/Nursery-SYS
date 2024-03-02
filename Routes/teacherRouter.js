const express = require("express");
const router = express.Router();

const { createTeacher, getAllTeachers, updateTeacher,getTeacherById, deleteTeacher } = require("../Controller/techerController");
const { teacherInsertArray } = require("../middlewares/Validator/teacherValidator");
const { validatorAcitvator } = require("../middlewares/Validator/validator");
const checkFileUpload = require('../middlewares/Validator/imageValidation');
const upload = require("../middlewares/multer");
const { isAdmin, isTeacher } = require("../middlewares/authorizationMiddlewar");


router.route('/teachers')
    .get(isAdmin,getAllTeachers)
    .put(updateTeacher)
    .delete(isAdmin,deleteTeacher)
    .post(
        upload.single("profileImage"),
        checkFileUpload,
        teacherInsertArray,
        validatorAcitvator,
        createTeacher
    )

router.route("/teachers/:id")
    .get(isTeacher, getTeacherById)
    

module.exports = router;



    