
const session = require('express-session'); // both of these are required to display success of error outcomes

const dbcontroller = require('./databaseController');
const authRoute = {};

authRoute.sendlogin = function(req, res){
    dbcontroller.login(function(error, data){
        if(error){
            res.status(400).send(error);
        }
        res.status(200).render('login', {layout:false});
    });
}

authRoute.dologin = function(req, res){
    dbcontroller.login(req, res, function(error, data){
        if(error){
            res.status(402).send(error);
        }
        res.status(200).redirect('/');
    })
}

authRoute.sendsignup = function(req, res){
    res.status(200).render('signup', {layout:false});
}

authRoute.dosignup = function(req, res){
    dbcontroller.adduser(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send(data);
    })
}

authRoute.addjob = function(req, res){
    dbcontroller.createnewjob(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send(data);
    })
}

module.exports = authRoute;