
const express = require('express');
const router = express.Router();
const { changePassword } = require('../Controller/authController');
const { isTeacher } = require('../middlewares/authMiddlewar');

router.route("/changePassword")
      .post(isTeacher,changePassword)

module.exports = router;