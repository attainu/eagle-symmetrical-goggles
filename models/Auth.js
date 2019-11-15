const Auth = {};

Auth.login = function(email, password, db, callback) {
   // var user = null;
    db.collection('loginDetails').findOne({ email: email, password: password }, function(err, result){
        if (err){
            return callback(err);
        }
        if (result) {
            return callback(null, result)
        }
        
    });
    /* if(!user){
        return callback("Invalid username or password");
    }
    return callback(null, "login successful", user); */
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