
const dbcontroller = require('./../controllers/db_cntrl');
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
    res.send(req.body);
}

authRoute.sendsignup = function(req, res){
    return res.status(200).render('signup', {layout:false});
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
authRoute.forgotPassword = function(req, res) {
    dbcontroller.findUser(req, res, function(error, data) {
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send(data);
    })
}
authRoute.setPassword = function(req, res) {
    dbcontroller.setPassword(req, res, function(error, data) {
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send(data);
    })
}

module.exports = authRoute;