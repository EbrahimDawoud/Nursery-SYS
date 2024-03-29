
const express = require('express');
const router = express.Router();
const { changePassword } = require('../Controller/authController');
const { isTeacher } = require('../middlewares/authorizationMiddlewar');

router.route("/changePassword")
      .put(isTeacher,changePassword)

module.exports = router;