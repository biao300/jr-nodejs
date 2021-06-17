/*
 * this is a data storage file since we haven't db yet
 * {
 *    id: number,
 *    description: string,
 *    done: boolean
 * }
 */
const tasks = [];
let id = 1;

// Create
function addTask({description}) {
    const task = {description, id: id++, done: false};
    tasks.push(task);
    return task;
}

// Read all
function getAllTask({description}) {
    if (description) {
        const filtedTasks = tasks.filter(i=>i.description.includes(description));
        return filtedTasks;

    } else {
        return tasks;
    }
}

// Read one
function getTaskById(id) {
    return tasks.find(i=>i.id === Number(id));
}

// Update
function updateTaskById(id, {done, description}) {
    const task = getTaskById(id);
    if (task) {
        if (description) {
            task.description = description;
        }
    
        if (done !== undefined) {
            task.done = !!done; // convert string to boolean
        }
    }

    return task;
}

// Delete
function deleteTaskById(id) {
    const index = getTaskIndexById(id);
    tasks.splice(index, 1);
}

// helper function
function getTaskIndexById(id) {
    return tasks.findIndex(i=>i.id === Number(id));
}

module.exports = {
    getAllTask, 
    getTaskById, 
    addTask, 
    updateTaskById, 
    deleteTaskById
};
