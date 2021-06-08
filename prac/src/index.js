const express = require('express');

const cors = require('./middleware/cors');
const routes = require('./routes'); 

const app = express();

// convert body text to js object 
app.use(express.json());
app.use(cors);

//try to write entry file as simple as possible, dont write so many routers
//app.use(taskRouter);
//app.use(userRouter);

// api versioning
//app.use('/v1', router);
//app.use('/v2', v2router);
app.use(routes);

app.listen(3000, () => {
    console.log('server listening on port 3000');
});