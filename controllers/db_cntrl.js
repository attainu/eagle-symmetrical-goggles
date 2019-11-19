const User = require('../models/users_model');
const Job = require('./../models/jobs_model');
const Posts = require('./../models/posts_model');

const DatabaseController = {}

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
DatabaseController.doLogin = function(email, password, cb) {
    User.findOne({"email":email, "password": password}, function(error, data){
        if(error) {
            return cb(error);
        }
        //console.log(data);
        if(data == []) {
            return cb("USer not found")
        }
        return cb(null, data);
    })
}

DatabaseController.adduser = function(req, res, cb){
    User.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.full_name,
        gender: req.body.gender,
        phone: req.body.phone_number,
        email: req.body.email,
        datecreated: Date.now()
    }, function(error, response){
        if(error){
            return cb({
                status: false,
                message: "unable to write this data"
            })
        }
        return cb(null, {
            status: true,
            message: "Success",
            data: response
        })
    })
}

DatabaseController.createnewjob = function(req, res, cb){
    Job.create({
        title: req.body.title,
        place: req.body.place,
        company: req.body.company,
        experience: req.body.experience,
        datecreated: Date.now()
    }, function(error, response){
        if(error){
            return cb({
                status: false,
                message: "unable to write this data"
            })
        }
        return cb(null, {
            status: true,
            message: "Success",
            data: response
        })
    })
}
var email = null;
DatabaseController.findUser = function(req, res, cb) {
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

DatabaseController.setPassword = function(req, res, cb){
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    if(password === confirmPassword){
        User.findOneAndUpdate({"email" : email}, {"password": password}, function(error, data){
            if(error){
                return  res.send({
                    status: false,
                    message: error
                })
            } else{
                return res.send({
                    status: true,
                    message: "Password changed successfully. Please Login"
                })
            }
        })
    }
    else{
        return res.send({
            message: "Password and confirm password are not same"
        })
    }
}


module.exports = DatabaseController;