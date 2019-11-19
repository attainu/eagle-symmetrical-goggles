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

DatabaseController.adduser = function(req, res, cb){
    User.create({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.full_name,
        gender: req.body.gender,
        phone: req.body.phone_number,
        email: req.body.email,
        datecreated: Date.now()
    }, function(error, response){
        if(error){
            return cb({
                status: false,
                message: "unable to write this data",
                error: error
            })
        }
        return cb(null, {
            status: true,
            message: "Success",
            data: response
        })
    })
}

DatabaseController.edituser = function(request, response, cb){
    var email = request.body.email;
    var password = request.body.password;
    var dataFromUser = request.body;
    User.find({"email": email},function(error, doc){
        if(error){
            console.log(error);
            return cb({
                status: false,
                message: "failed to load data"
            });
        }
        console.log(doc[0].password);
        if(doc[0].password!==password){
            return cb({
                status: false,
                message: "Error! Password not matched"
            });
        }
        User.updateMany({
            "email" : email
        }, {
            "$set": dataFromUser
        }, function(error, res){
            if(error){
                return console.log("error");
            }
            return cb({
                status: true,
                message: res
            });
        });
    });
}

DatabaseController.createnewjob = function(req, res, cb){
    Job.create({
        title: req.body.title,
        place: req.body.place,
        company: req.body.company,
        location: req.body.location,
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
        });
    });
}

DatabaseController.retrievejob = function(req, res, cb){
    Job.find({
        title: req.body.title,
        location: req.body.location
    }, function(error, response){
        if(error){
            return cb({
                status: false,
                message: "unable to get jobs data"
            })
        }
        return cb(null, {
            status: true,
            message: "Success",
            data: response
        })
    })
}


module.exports = DatabaseController;