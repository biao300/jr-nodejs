const Course = require('../moddles/course');

function getAllCourses(req, res) {
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

function getCourseById(req, res) {

}

function updateCourseById(req, res) {

}

function deleteCourseById(req, res) {

}

function createCourse(req, res) {
    const {code, name, description} = req.body;
    // todo: validate data
    // don't use req.body because we don't need everything from body
    // here we specify code,name,description
    const course = new Course({code, name, description});
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