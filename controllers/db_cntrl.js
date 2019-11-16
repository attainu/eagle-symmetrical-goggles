
DatabaseController = {}

var loggedin = false; //logic yet to add
var usernameexists = false; //logic remaining with mongoose

DatabaseController.login = function(cb){
    if(loggedin){
        return cb("user already logged in");
    }
    else{
        return cb(null, 'please login');
    }
}

DatabaseController.adduser = function(res, cb){
    if(usernameexists){
        return cb("username already exists");
    }
    else{
        return cb(null, 'Cool');
    }
}

module.exports = DatabaseController;