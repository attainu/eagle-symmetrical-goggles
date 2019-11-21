const Signup = require('../models/Users.js');
const SignupController = {};

SignupController.create = function(req, res) {
	var data = req.body;
	if(data.password !== data.confirmPassword){
		return res.send({
			status: false,
			message: "password and confirmPassword needs to be same"
		})
	}
	Signup.create({
		username: data.email,
		email: data.email,
		fullname: data.firstname+ ' '+data.lastname,
		email: data.email,
		gender: data.gender,
		password: data.password,
		phone: data.mobileNumber
	}, function(error, response) {
		if(error) {
			return res.status(500).send({
				status: false,
				message: "FAiled to create User"
			});
		}
		return res.status(200).send({
			status: true,
			message: "User created Successfully and login details saved"
		})

	})
}

module.exports = SignupController;