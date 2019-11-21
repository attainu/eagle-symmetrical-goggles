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
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String
    },
    age: {
        type: Number
    },
    bioSummary: {
        type: String
    },
    skills: {
        type: Array
    },
    projects: {
        type: Array
    },
    jobs: {
        type: Array
    },
    followers: {
        type: Array
    },
    following: {
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
