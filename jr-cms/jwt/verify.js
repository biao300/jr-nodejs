const jwt = require('jsonwebtoken');

// make a new folder as "playground" to try new libraries
// read their documents about how to use

const secret = 'secret';

const payload = {
    id:1234
}; 

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjIzNjYyOTk0LCJleHAiOjE2MjM2NjMwMDR9.2Y7WHMb9QLs12N4eS6dFKiaLYvJzJFZBDDjCwuerPCo';

const valid = jwt.verify(token, secret);

console.log(valid);

// decode test:  https://jwt.io/

