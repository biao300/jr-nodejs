const express = require('express');
const {
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    createStudent,
    addStudentToCourse,
    removeStudentFromCourse
} = require('../controllers/students');
const { route } = require('./courses');

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);
router.post('/', createStudent);

// put or post is not mandatory
// have a look paypal's api design to make your own 
router.post('/:id/courses/:code', addStudentToCourse);
router.delete('/:id/courses/:code', removeStudentFromCourse);

module.exports = router;