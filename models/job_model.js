var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    jobid: {
        type: String,
        unique: true
    },
    title: {
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
    createdate: Date
});

var user = mongoose.model('myuser', userSchema);
module.exports = user;