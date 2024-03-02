
const express = require('express');
const router = express.Router();
const { login } = require('../Controller/authController');
const upload = require("../middlewares/multer");
const checkFileUpload = require('../middlewares/Validator/imageValidation');
const {createTeacher} = require("../Controller/techerController");
const { teacherInsertArray } = require("../middlewares/Validator/teacherValidator");
const { validatorAcitvator } = require("../middlewares/Validator/validator");

router.route("/login")
      .get(login)
router.route("/login")
      .post(login)

// teacher registeration
router.route("/register")
.post(
      upload.single("profileImage"),
      checkFileUpload,
      teacherInsertArray,
      validatorAcitvator,
      createTeacher
)

module.exports = router;