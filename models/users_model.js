const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    datecreated: {
        type: Date,
        default: new Date()
    }
},
{
    collection:'sobrad_users'
});

var user = mongoose.model('User', userSchema);
module.exports = user;