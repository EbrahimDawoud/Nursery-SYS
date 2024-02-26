
const express = require('express');
const router = express.Router();
const { login } = require('../Controller/authController');

router.route("/login")
      .get(login)

module.exports = router;