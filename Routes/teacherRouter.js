const express = require('express');
const router = express.Router();
const teachersControllers = require("../Controller/techerController");
const upload = require("../middlewares/multer");

router.get(
    "/",
    (req, res) => {
        res.json({ message: "Welcome to the teacher page" });
    })
    .post(
        "/login",
        upload.single("photo"),
        teachersControllers.register
    )
    .post(
        "/update/:userId",
        upload.single("photo"),
        teachersControllers.update
    );  
module.exports = router;
