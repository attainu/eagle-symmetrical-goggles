const mongoose = require('mongoose');
const Auth = require('./Auth');
//const Search = require('./Search');
const Signup = require('./Signup');
const Post = require('./Post.js');

function connect() {
    return mongoose.connect('mongodb://localhost:27017/whitecollardb', {
        useNewUrlParser : true,
        useUnifiedTopology: true
    });
}

module.exports = {
    models : {
        Auth : Auth,
        Post : Post,
        Signup: Signup
    },
    connect: connect
};