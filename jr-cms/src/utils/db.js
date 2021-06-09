const mongoose = require('mongoose');


exports.connectToDB = () => {
    const connectionString = process.env.CONNECTION_STRING;
    const db = mongoose.connection;
    db.on('connected', () => {
        console.log(`DB connected with ${connectionString}`);
    });
    db.on('error', (error) => {
        console.log(`DB connection failed ${error.message}`);
        // 正常关闭
        // 非正常关闭
        // 人为正常关闭:  process.exit(0);
        // 人为非正常关闭
        process.exit(1);
    });
    db.on('diconnected', () =>{ 
        console.log('diconnected');
    });

    // for warning, fit new version
    mongoose.connect(connectionString, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
};