const Signup = require('./../models/Signup.js');
const SignupController = {};

SignupController.create = function(req, res) {
	var data = req.body;
	if(data.password !== data.confirmPassword){
		return res.send({
			status: false,
			message: "password and confirmPassword needs to be same"
		})
	}
	Signup.Profile.create({
		username: data.username,
		firstname: data.firstname,
		lastname: data.lastname,
		email: data.email,
		password: data.password,
		mobileNumber:data.mobileNumber
	}, function(error, response) {
		if(error) {
			return res.status(500).send({
				status: false,
				message: "FAiled to create User"
			});
		}
	
		Signup.Login.create({
			email: data.username,
			password: data.password
		}, function(error, response) {
			if(error) {
				/* return res.status(500).send({
					status: false,
					message: "Failed to save login details"
				}); */
				console.error(error);
			}
		})
		console.log(data.username);
		return res.status(200).send({
			status: true,
			message: "User created Successfully and login details saved"
		})

	})
}

module.exports = SignupController;