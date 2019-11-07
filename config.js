module.exports = {
    //mongoose config
    dbURI: 'mongodb://localhost:27017/todo',
    options: {
        useNewUrlParser: true //使用客户端
            ,
        useUnifiedTopology: true //报错
        //     ,
        // authSource: "user",
        // user: "togoc",
        // pass: "tgc.123"
    },
    //jsonwebtoken secret
    secret: "secret"
}