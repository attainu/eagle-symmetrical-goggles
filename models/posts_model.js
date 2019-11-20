var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    postid: {
        type: String,
        unique: true
    },
    content:{
        type: String
    },
    createdate: Date
});

var user = mongoose.model('myuser', userSchema);
module.exports = user;