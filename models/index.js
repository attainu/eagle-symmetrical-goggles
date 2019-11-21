const mongoose = require('mongoose');
const Auth = require('./Auth');
const Jobs = require('./Jobs');
const Users = require('./Users');
const Feedpage = require('./Feedpage.js');

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