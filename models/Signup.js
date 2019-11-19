const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    }
}, {
    collection: 'profiles'
}); 

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
},
{
    collection: 'loginDetails'
})
const Profile = mongoose.model('Profile', profileSchema);
const Login = mongoose.model('Login', loginSchema);
module.exports = {
    Profile,
    Login
}
