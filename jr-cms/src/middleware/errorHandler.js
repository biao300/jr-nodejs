module.exports = (error, req, res, next) => {
    console.log(error.name);
    if (error.name === 'ValidationError') {
        if (process.env.NODE_ENV === 'production') {
            // object manipulation, this is a basic knowledge
            const {details} = error;
            const errMsg = details.map((i) => ({message: i.message}));
            console.log(errMsg);
            return res.status(400).json(errMsg);
        } else {
            // for development environment
            //console.log(error);
            return res.status(400).json(error);
        }
    }

    // todo: catch other errors

    // for those errors we dont handle, this is not good, should avoid this!!
    // log => use winston to send to monitor platform
    // expressjs.com
    return res.status(500).send('something unexpected happened, please try again later')
};

// for error.name === 'ValidationError'
// if (error instanceof CustomError) {}
//class CustomError extends Error {

//}

// express-async-errors returns an html page if it doesnt have this

// in the whole project, backend need to keep a fixed format response:
// eg. (RESTful api)
// {
//    data:[], 
//    error:""
// }