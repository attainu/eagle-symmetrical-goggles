const Myuser = require('./../models/users_model');
const ProfileEditModel = require('./../models/Settings.js');

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

DatabaseController.edituser = function(request, response){
    var email = request.body.email;
    var password = request.body.password;
    var dataFromUser = request.body;
    console.log(email);
    var userDetails = [];
    Myuser.find({"email": email},function(error, doc){
        if(error){
            return res.send({
                status: false,
                message: "Failed to load data"
            });
        }
        userDetails = doc;
    });

	ProfileEditModel.edit(userDetails, password, function(error, data) {
		if(error) {
			return response.status(500).json({
                success: false,
                message: error
            });
        }

        Myuser.updateMany({
            "email" : email
        }, {
            "$set": dataFromUser
        }, function(error, res){
            if(error){
                return console.log("error");
            }
            console.log(userDetails);
            return response.status(200).json(data);
        });
	});
}

module.exports = DatabaseController;