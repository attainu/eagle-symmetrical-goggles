const mongoose = require('mongoose');
const Auth = require('./Auth');
const Jobs = require('./Jobs');
const Signup = require('./Signup');
const Feedpage = require('./Homepage.js');

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
        Signup: Signup,
        Jobs: Jobs
    },
    connect: connect
};