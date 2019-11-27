const bcrypt = require('bcrypt');

const Signup = require('../models/Users.js');
const SignupController = {};

SignupController.create = function(req, res) {
	var data = req.body;
	if(data.password !== data.confirmPassword){
		return res.render('Signup',{
			status: false,
			msg: "Password and ConfirmPassword needs to be same",
			css_file_ref: '/css/signup.css'
		})
	}
	bcrypt.hash(data.password, 10, function(error, bcrypt_hashedPassword){
		Signup.create({
			email: data.email,
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			gender: data.gender,
			password: bcrypt_hashedPassword,
			phone: data.mobileNumber
		}, function(error, response) {
			if(error) {
				console.log(error);
				return res.status(500).render('Signup',{
					msg: "Email or Mobile number is already Registered",
					css_file_ref: '/css/signup.css'
				});
			}
			return res.status(200).render('Signup',{
				status: true,
				message: "User created Successfully and login details saved",
				css_file_ref: '/css/signup.css'
			})

		})
	})
}

module.exports = SignupController;