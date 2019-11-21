const mongoose = require('mongoose');
const Auth = require('./Auth');
const Jobs = require('./Jobs');
const Signup = require('./Signup');
const Feedpage = require('./Homepage.js');
const Users = require('./Users');

function connect() {
    return mongoose.connect('mongodb://localhost:27017/whitecollardb', {
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