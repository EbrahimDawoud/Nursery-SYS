const express = require("express");
const router = express.Router();
const { classInsertArray } = require('../middlewares/Validator/classValidation');
const { getClasses, addClass, updateClass, deleteClass, getClassById, getStudentByClassId, getTeacherByClassId } = require("../Controller/classController");
const { validatorAcitvator } = require('../middlewares/Validator/validator');

router.route("/class")
    .get(getClasses)
    .post(classInsertArray, validatorAcitvator, addClass)
    .put(classInsertArray, validatorAcitvator, updateClass)
    .delete(deleteClass);



router.route("/class/:id")
    .get(getClassById);


/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get students by class ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array of students in the specified class
 *       404:
 *         description: Class not found
 */

router.route("/class/child/:id")
    .get(getStudentByClassId);

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get teacher by class ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the teacher of the specified class
 *       404:
 *         description: Class not found
 */

router.route("/class/teacher/:id")
    .get(getTeacherByClassId);

module.exports = router