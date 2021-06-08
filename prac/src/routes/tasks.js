const express = require('express');
const parseId = require('../middleware/parseId');
const checkTaskExist = require('../middleware/checkTaskExist');

const {
    getAllTask, 
    getTaskById, 
    addTask, 
    updateTaskById, 
    deleteTaskById
} = require('../controllers/task');

const router = express.Router();

router.get('', getAllTask);
router.get('/:id', parseId, checkTaskExist, getTaskById);
router.post('', addTask);
router.put('/:id', parseId, checkTaskExist, updateTaskById);
router.delete('/:id', parseId, checkTaskExist, deleteTaskById);

module.exports = router;