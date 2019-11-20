const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
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
    skills: {
        type: Array
    },
    projects: {
        type: Array
    },
    job: {
        type: Array
    },
    datecreated: {
        type: Date,
        default: new Date()
    }
}, {
    collection: 'profiles'
}); 


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile
