const UpdateProfileController = {};
const Model = require('./../models/Settings.js');

// adding null variable which will use in mongoDb
var db = null;
var userCollection = null;

UpdateProfileController.edit = function(request, response) {
    db = request.app.locals.db;
    userCollection = db.collection('usersInfo');
    var email = request.body.email;
    var password = request.body.password;
    var dataFromUser = request.body;
    var userDetails = [];
    userCollection.find({"email": email}).toArray(function(error, res){
        if(error){
            return res.send({
                status: false,
                message: "Failed to load data"
            });
        }
        userDetails = res;
    });

	Model.edit(userDetails, password, function(error, data) {
		if(error) {
			return response.status(500).json({
                success: false,
                message: error
            });
        }

        userCollection.updateMany({
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

module.exports = UpdateProfileController;

