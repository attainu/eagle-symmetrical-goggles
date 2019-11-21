const mongoose = require('mongoose');
const Auth = require('./Auth');
const Jobs = require('./Jobs');
<<<<<<< HEAD
=======

>>>>>>> 4de38145e51d6b08b821db14fb96a37b8c9ab112
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
