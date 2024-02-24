const express = require("express");
const authControllers = require("../Controller/auth");

const router = express.Router();

router.post("/login",authControllers.login);
module.exports = router;
