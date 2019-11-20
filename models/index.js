const mongoose = require('mongoose');
const Auth = require('./Auth');
//const Search = require('./Search');
const Signup = require('./Signup');
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
        Signup: Signup
    },
    connect: connect
};