const jwt = require('jsonwebtoken');

// make a new folder as "playground" to try new libraries
// read their documents about how to use

const secret = 'secret';

const payload = {
    id:1234
};

// expiresIn: 1h, 1d....
const token = jwt.sign(payload, secret, {expiresIn: 10});

console.log(token);

// decode test:  https://jwt.io/

