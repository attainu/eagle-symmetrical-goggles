const mongoose = require('mongoose');
const Auth = require('./Auth');
const Jobs = require('./Jobs');

// const Signup = require('./Signup');
const Feedpage = require('./Homepage.js');
const Users = require('./Users');

if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging') {
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_URL = process.env.DB_URL;
    //var dbURL = 'mongodb+srv://'+DB_USERNAME+':'+DB_PASSWORD+'@'+DB_URL;
    var dbURL = 'mongodb+srv://root:whitecollar@whitecollar-k9pft.mongodb.net/test?retryWrites=true&w=majority'
}else {
    var dbURL = 'mongodb://localhost:27017/whitecollardb'
}
/* 'mongodb+srv://root:whitecollar@whitecollar-k9pft.mongodb.net/test?retryWrites=true&w=majority'
password is whitecollar */
function connect() {
    return mongoose.connect(dbURL, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    });
}

module.exports = {
    models : {
        Auth : Auth,
        Feedpage : Feedpage,
        Users: Users,
        Jobs: Jobs
    },
    connect: connect
};
