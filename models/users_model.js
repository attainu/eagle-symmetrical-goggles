var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    age:{
        type: Number
    },
    bio:{
        type: String
    },
    city: {
        type: String
    },
    companyname:{
        type: String
    },
    designation:{
        type: String
    },
    experience: {
        type: Number
    },
    summary:{
        type: String
    },
    projecttitle:{
        type: String
    },
    projectsummary: {
        type: String
    },
    createdate: Date
});

var user = mongoose.model('myusers', userSchema);
module.exports = user;