const {Schema, model} = require('mongoose');

const schema = new Schema({
    _id: {
        type: String,
        uppercase: true,    // change to uppercase whatever received
        alias: "code"
    },
    name : {
        type: String,
        require: true     // must have this
    },
    description: {
        type: String,
        default:'This is a description'    // if not passed
    },
    students: [
        // javascript doesnt know what is ObjectId, only mongodb knows
        {type: Schema.Types.ObjectId, ref: 'Student'}
    ],
    __v: {
        // to keep data consistency from different servers
        // use select: false to hide it
        type: Number
        //select: false
    }
}, 
{
    timestamps: true,
    toJSON: {
        virtuals:true
    },
    // add this if you dont want id to be displayed
    id: false
});

//schema.virtual('code').get(function() {
//    return this._id;    // set code as _id 's another name

    // dont use arrow function here, because we want "this" point to document
    // only mongoose will display, it is not exist in database exactly
    // the normal usage like: combine first name + last name = full name
    // use alias if just return anoter name
//})

// Course -> courses (collection)
module.exports = model('Course', schema);
// model(name, schema)