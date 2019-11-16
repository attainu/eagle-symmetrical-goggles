
DatabaseController = {}

var loggedin = false;

DatabaseController.login = function(cb){
    if(loggedin){
        return cb("user already logged in");
    }
    else{
        return cb(null, 'please login');
    }
}

module.exports = DatabaseController;