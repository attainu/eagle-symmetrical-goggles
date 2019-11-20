
const bcrypt = require('bcrypt'); // package used to convert text pass to hash using its salt

const User = require('../models/UsersModel');
const Job = require('../models/JobsModel');
const Posts = require('../models/PostsModel');

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
    bcrypt.hash(req.body.password, 10, function(err, bcrypt_hashedpassword){
        User.create({
            username: req.body.username,
            password: bcrypt_hashedpassword,
            name: req.body.full_name,
            gender: req.body.gender,
            phone: req.body.phone_number,
            email: req.body.email,
            datecreated: Date.now()
        }).then(function(data){
            return cb(null, data);
        }).catch(function(err){
            return cb(err);
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