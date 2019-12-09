const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
    phone: {
        type: Number,
        required: true
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
    followers: { type: Array},
    following: { type: Array},
    datecreated: {
        type: Date,
        default: new Date()
    },
    profileImageUrl: String
}, {
    collection: 'profiles'
}); 


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile