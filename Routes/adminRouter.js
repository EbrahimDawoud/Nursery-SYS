const express = require('express');
const router = express.Router();
// const adminController = require('../controllers/adminController');

router.route('/admin')
    .get((req, res) => {
        res.json({ message: "Welcome to the admin page" });
    })
    



module.exports = router;