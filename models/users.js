var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    createdate: Date
});

var user = mongoose.model('myuser', userSchema);
module.exports = user;