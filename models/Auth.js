const Auth = {};
const User = require('./../models/Signup.js');
Auth.login = function(email, password, cb) {
  //  console.log(email, password);
   User.findOne({"email":email, "password": password}, function(error, data){
        if(error) {
            return cb(error);
        }
      //  console.log(data);
        if(data == []) {
            return cb("User not found")
        }
        return cb(null, data);
    })
};

Auth.checkIfLoggedIn = function(url, userSession, callback) {
    if(url === '/login') {
        return callback(null, "Next");
    }
    if(typeof userSession === "undefined") {
        return callback("Unauthorised Request");
    }
    return callback(null, "Next");
};

module.exports = Auth;