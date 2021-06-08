const {Schema, model} = require('mongoose');

const schema = new Schema({
    _id: {
        type: String,
        uppercase: true    // change to uppercase whatever received
    },
    name : {
        type: String,
        require: true     // must have this
    },
    description: {
        type: String,
        default:'This is a description'    // if not passed
    }
});

schema.virtual('code').get(function() {
    return this._id;    // set code as _id 's another name

    // dont use arrow function here, because we want this point to document
})
// Course -> courses (collection)
module.exports = model('Course', schema);
// model(name, schema)