const bcrypt = require('bcrypt');

const Auth = {};
const User = require('./Users.js');
Auth.login = function(email, plain_password, cb) {
    //console.log(email, password);
    User.findOne({"email": email}, function(error, data){
        if(error){
            return cb(error);
        }
        if(!data){
            return cb("No Such User ... Please Signup")
        }
        console.log(data)
        bcrypt.compare(plain_password, data.password, function(err, res){
            console.log(res);
            return cb(null, res)
        })
    })
};

Auth.checkIfLoggedIn = function(url, userSession, callback) {
    if(url === '/login'|| url === '/signup' || url === '/about' || url === '/signup/create' || url === '/forgotpassword' || url === '/setpassword' || url === '/about') {
        return callback(null, "Next");
    }
    if(typeof userSession === "undefined") {
        return callback("Unauthorised Request");
    }
    return callback(null, "Next");
};

module.exports = Auth;