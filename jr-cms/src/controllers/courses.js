const Course = require('../moddles/course');

async function getAllCourses(req, res) {
    // db.collections.find() this is in mongodb
    const courses = await Course.find().exec();  //find() is async, use await promise to pack it
    res.json(courses);

    // other writting forms
    // Course.findById().then().catch()  // promise

    // callback
    // Course.findById((error, result) => {
    //    
    // })
}

// request format:
// localhost:3000/api/courses/COMP1
async function getCourseById(req, res) {
    const {id} = req.params;
    //console.log(`getCourseById(${id})`);
    const course = await Course.findById(id);
    if (!course) {
        return res.sendStatus(404);
    }
    return res.json(course);
}

async function updateCourseById(req, res) {
    const {id} = req.params;
    const {name, description} = req.body;
    //const course = new Course({_id:code, name, description});
    //await course.save();
    const course = await Course.findByIdAndUpdate(id, {name, description}, {new: true});
    
    if (!course) {
        return res.sendStatus(404);
    }
    return res.json(course);
}

async function deleteCourseById(req, res) {
    const {id} = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204); 
}

async function createCourse(req, res) {
    const {code, name, description} = req.body;
    // todo: validate data
    // don't use req.body because we don't need everything from body
    // here we specify code,name,description
    const course = new Course({_id:code, name, description});
    await course.save();
    return res.status(201).json(course);
}

module.exports = {
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    createCourse
}; 