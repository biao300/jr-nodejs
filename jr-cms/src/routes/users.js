const express = require('express');
const {
    addUser
} = require('../controllers/users');

const router = express.Router(); 

//router.get('/', getAllStudents);
//router.get('/:id', getStudentById);
//router.put('/:id', updateStudentById);
//router.delete('/:id', deleteStudentById);
router.post('/', addUser);

module.exports = router;