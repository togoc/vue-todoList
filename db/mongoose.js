const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require("../config")

// Build the connection string

// Create the database connection
// const dbURI = "mongodb://localhost:27017/profile"
// mongoose.connect(dbURI, config.options);
mongoose.connect(config.dbURI, config.options);

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function() {
    console.log('Mongoose 开始连接 ' + config.dbURI);
});

// If the connection throws an error
db.on('error', function(err) {
    console.log('Mongoose 连接错误 : ' + err);
});
// db.once("open", function () {
//     console.log("Mongoose 集合打开成功!")
// })
db.once("close", function() {
    console.log('Mongoose 断开连接')
})

module.exports = mongoose;