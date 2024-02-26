const express = require('express');
const { getAllChildren, addChild, getChildById, updateChild, deleteChild } = require('../Controller/childController');
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddlewar");
const { childInsertArray } = require('../middlewares/Validator/chlidValidation');
const { updateChildArray } = require('../middlewares/Validator/updateChildValidator');
const { validatorAcitvator } = require('../middlewares/Validator/validator');

const checkFileUpload = require('../middlewares/Validator/imageValidation');
const upload = require("../middlewares/multer");

router.route('/children')
    .all(isAdmin)
    .get(getAllChildren)
    .post(
        upload.single("profileImage"),
        checkFileUpload,
        childInsertArray,
        validatorAcitvator,
        addChild
    )
    .put(
        upload.single("profileImage"),
        checkFileUpload,
        updateChildArray,
        validatorAcitvator,
        updateChild
    )
    .delete(deleteChild)

router.route("/children/:id")
.get(getChildById)

module.exports = router;
