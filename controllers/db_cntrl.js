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


module.exports = DatabaseController;