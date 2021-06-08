const Task = require('../models/task');



function addTask(req, res) {
    console.log('3');
    const {description} = req.body;
    // should do some data validation
    const task = Task.addTask({description});
    return res.status(201).json(task);
}
function getTaskById(req, res) {
    console.log('2');
    const { id } = req.params;
    const task = Task.getTaskById(id);
    return res.json(task);
}


function getAllTask(req, res) {
    console.log('1');
    const { description } = req.query;
    const tasks = Task.getAllTask({ description });
    return res.json(tasks);
}

function updateTaskById(req, res) {
    console.log('4');
    const { id } = req.params;
    const {description, done} = req.body;
    const task = Task.updateTaskById(id, {description, done});
    return res.json(task);
}

function deleteTaskById(req, res) {
    console.log('5');
    const { id } = req.params;
    Task.deleteTaskById(id);
    return res.sendStatus(204);
}

module.exports = {
    getAllTask, 
    getTaskById, 
    addTask, 
    updateTaskById, 
    deleteTaskById
};
