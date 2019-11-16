const mongoose = require('mongoose');
const Auth = require('./Auth');
const Search = require('./Search');
const Signup = require('./Signup');

function connect() {
    return mongoose.connect('mongodb://localhost:27017/whitecollardb', {
        useNewUrlParser : true,
        useUnifiedTopology: true
    });
}

module.exports = {
    models : {
        Auth : Auth,
        Search: Search,
        Signup: Signup
    },
    connect: connect
};