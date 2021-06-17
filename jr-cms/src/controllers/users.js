const User = require('../models/user');
const {generateToken} = require('../utils/jwt');

async function addUser(req, res) {
    const {username, password} = req.body;

    const existingUser = await User.findOne({username}).exec();

    if (existingUser) {
        // why response json? => api need to provide a fixed format
        return res.status(409).json('User already exists');
        // status() vs sendStatus()
        // status: only set status code, sendStatus: set and return
        // send vs json <= api server recommend to return json format
    }

    const user = new User({username, password});
    await user.hashPassword();
    console.log(user);
    await user.save();
    const token = generateToken({id:user._id});
    return res.status(201).json({token, username});
}

module.exports = {
    addUser
};