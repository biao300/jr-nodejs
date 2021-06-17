const Course = require('../models/course');
const Student = require('../models/student');

// express-async-errors, it fixed the internal express logic to support try catch
// only support express 4, 5 has it already


// this is also annoying: router.get('/', tryCatch(getAllStudents)); need do this for every calling!!
function tryCatch(routeHandler) {
    return (req, res, next) => {
        try {
            routeHandler(req, res, next);
        } catch (e) {
            next(e);
        }
    }
}

async function getAllStudents(req, res) {
    const students = await Student.find().exec();
    res.json(students);
}

async function getStudentById(req, res) {
    const {id} = req.params;
    // use populate to get course data related to this student
    // can give params to get certain fields
    const student = await Student.findById(id).populate('courses','name').exec();
    if (!student) {
        return res.sendStatus(404);
    }
    return res.json(student);
}

async function updateStudentById(req, res) {
    const {id} = req.params;
    const {firstName, lastName, email} = req.body;
    //const course = new Course({_id:code, name, email});
    //await course.save();
    const student = await Student.findByIdAndUpdate(id, {firstName, lastName, email}, {new: true}).exec();
    
    if (!student) {
        return res.sendStatus(404);
    }
    return res.json(student);
}

async function deleteStudentById(req, res) {
    const {id} = req.params;
    const student = await Student.findByIdAndDelete(id).exec();

    if (!student) {
        return res.sendStatus(404);
    }

    await Course.updateMany(
        //{
            // alternative method
        //    _id: {$in: student.courses}
        //},
        {
            students: student._id
        }, 
        {
            $pull: {students: student._id}
        }
    );
    // 204 no content
    return res.sendStatus(204);
}

async function createStudent(req, res) {
    const {firstName, lastName, email} = req.body;
    // todo: validate data
    // don't use req.body because we don't need everything from body
    // here we specify code,name,description
    const student = new Student({firstName, lastName, email});
    
    // a little complex using try catch???
    try {
        await student.save();
    } catch(e) {
        return res.send(e);
    }

    // introduce other error processing methods
    //student.save((error, result) => {
        // can been seen in old projects
    //    if (error) {
            // dont return yet
    //        next(e);
    //    }
    //    res.status(201).json(result);
    //});

    //student.save().then((result) => {
    //    res.status(201).json(result);
    //}).cathc(error => {
    //    next(error);
    //})
   
    return res.status(201).json(student);
}

async function addStudentToCourse(req, res) {
    // write comments if you dont know how to begin writing code
    // get student, get course code
    const {id, code} = req.params;
    // find student
    const student = await Student.findById(id).exec();
    // find course
    const course = await Course.findById(code).exec();
    // check if student or course exist
    if (!student || !course) {
        // todo: give an error message
        return res.sendStatus(404);
    }
    // check if student already erolled
    // addToSet, wont add if already exists 
    // another method: if (student.courses.includes(course._id))
    // add course to student
    student.courses.addToSet(course._id);
    // add student to course
    course.students.addToSet(student._id);
    // dont forget save
    await student.save();
    await course.save();
    // return updated student or 200/201
    return res.status(201).json(student);
}

async function removeStudentFromCourse(req, res) {
    const {id, code} = req.params;
    // find proceed is same as addStudentToCourse()
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();
    if (!student || !course) {
        return res.sendStatus(404);
    }
    // use pull to remove array element, if not exist will do nothing
    student.courses.pull(course._id);
    course.students.pull(student._id);
    await student.save();
    await course.save();
    // return updated student or 204
    return res.json(student);
}

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    createStudent,
    addStudentToCourse,
    removeStudentFromCourse
}; 