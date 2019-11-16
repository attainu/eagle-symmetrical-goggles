const Signup = require('./../models/Signup.js');
const SignupController = {};

SignupController.create = function(req, res) {
	var data = req.body;
	Signup.create({
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
		return res.status(200).send({
			status: true,
			message: "User created Successfully"
		})

	})
}

module.exports = SignupController;