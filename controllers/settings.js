const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const UpdateProfileController = {};
const Model = require('./../models/Settings.js');

// adding null variable which will use in mongoDb
var db = null;
var userCollection = null;

// Mongo client here..
MongoClient.connect(url, function(error, client) {
    if(error){
        throw error;
    }
    db = client.db('whiteCollar');
    userCollection = db.collection('usersInfo');
});

UpdateProfileController.edit = function(request, response) {
    var username = request.body.user_id;
    var password = request.body.password;
    var dataFromUser = request.body;
    var userDetails =[];
    userCollection.find({userId: username}).toArray(function(error, res){
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
            user_id : username
        }, {
            "$set": dataFromUser
        }, function(error, res){
            if(error){
                return console.log("error");
            }
            return response.status(200).json(userDetails);
        });
	});
}

module.exports = UpdateProfileController;

