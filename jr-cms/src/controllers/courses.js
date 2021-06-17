const Course = require('../models/course');
const Joi = require('Joi');
const Student = require('../models/student');

async function getAllCourses(req, res) {
    // db.collections.find() this is in mongodb
    // we dont use populate in getAll, too many data...
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
    const course = await Course.findById(id).populate('students').exec();
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

    // if course is deleted, its reference in student still exists, will make a lot of invalid data
    // same as db.collecions.updateMany()
    // here is how to delete the reference
    await Student.updateMany(
        {
            courses: course._id
        }, 
        {
            $pull: {courses: course._id}
        }
    );

    return res.sendStatus(204);
}

async function createCourse(req, res) {
    // const {code, name, description} = req.body;
    // todo: validate data
    // don't use req.body because we don't need everything from body
    // here we specify code,name,description

    // the reason to validate before mongoose:
    // if we dont want to use mongodb any more, easily to swipe
    // should write validator in a exclusive place
    const stringValidator = Joi.string().min(2).max(10).required();
    const schema = Joi.object({
        name: stringValidator,
        // regex101.com to test
        code: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
        description: Joi.string()
    });
    const {code, name, description} = await schema.validateAsync(req.body, {
        // allow data that dont exist in db, default is false
        allowUnknown: true,
        // remove data that dont exist in db
        stripUnknown: true,
        // set this to false to display all errors
        abortEarly: false
    });

    const existCourse = await Course.findById(code).exec();
    if (existCourse) {
        // duplicate course code because we changed _id to String
        return res.sendStatus(409);
    }

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