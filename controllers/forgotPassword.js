
const bcrypt = require('bcrypt');
const User = require('../models/Users.js');

const forgotPassword = {}

var email = null;
forgotPassword.findUser = function(req, res, cb) {
    email = req.body.email;
    User.find({"email":email}, function(error, data) {
        if(error){
            return res.send({
                status: false,
                message: error
            })
        }
        if(data == []){
            return res.send({message: "User not found"})
        }
        return res.render('setpassword')
        })
}

forgotPassword.setPassword = function(req, res, cb){
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    if(password === confirmPassword){
        bcrypt.hash(password, 10, function(error, bcrypt_hashedPassword){
            User.findOneAndUpdate({"email" : email}, {"password": bcrypt_hashedPassword}, function(error, data){
                if(error){
                    return  res.send({
                        status: false,
                        message: error
                    })
                } else{
                    return res.status(200).redirect('/login');
                }
            })
        })
    }
    else{
        return res.send({
            message: "Password and confirm password are not same"
        })
    }
}

module.exports = forgotPassword;