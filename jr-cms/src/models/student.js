const {Schema, model} = require('mongoose');
const Joi = require('joi');

// some popular validators:
// for backend: joi, express-validator
// for frontend: validator.js
// we use joi in this lesson

const schema = new Schema({
    firstName : {
        type: String,
        require: true,     // must have this
        trim: true,
        minlength: 2
    },
    lastName : {
        type: String,
        require: true,     // must have this
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                // use third party library here, because RegEx will be too complicated for other developers to maintain
                // dont trust anything from request, everything input must be checked at backend
                // if error != undefined, validate fail
                //const validation = Joi.string().email().validate(email);
                //const {error} = validation;
                //if (error) {
                    
                //    return false;
                //} else {
                //    return true;
                //}
                
                // equals to above source
                return !Joi.string().email().validate(email).error;
            },
            msg: 'Invalid email format'
        }
    },
    // relationship with course
    courses: [{type: String, ref: 'Course'}]
// _id will be added automatically
//    _id: {
//        type: String,
//        uppercase: true    // change to uppercase whatever received
//    },
});

module.exports = model('Student', schema);