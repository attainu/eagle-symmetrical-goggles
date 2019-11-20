
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
   // res.send(req.body);
    var email = req.body.username;
    var password = req.body.password;
    dbcontroller.doLogin(email, password, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        //req.session.loggedIn = true;
       // req.session.user = data.email;
        //console.log(data.email);
        if(!data) {
            return res.status(500).json(
				{
					status: false,
					message: "Invalid Credentials"
				}
			);
        } else{
        req.session.user = data.email;   
        return res.status(200).json(
			{
				status: true,
				message: "Login successfull"
			}
        );
    }
    })
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

authRoute.logout = function(req, res) {
    var session = req.session;
    session.destroy();
    res.clearCookie('Somename');
    return res.send({
        status: true,
        message: "Logged out"
    });
};

authRoute.searchjob = function(req, res){
    dbcontroller.retrievejob(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send(data);
    });
}

authRoute.edituser = function(req, res){
    dbcontroller.edituser(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send(data);
    });
}

authRoute.checkIfLoggedIn = function(req, res, next) {
    var url = req.originalUrl;
    var userSession = req.session.user;
    
    /* Model.checkIfLoggedIn(url, userSession, function(error, data) {
        if(error) {
            return res.json({
                status: false,
                message: error
            })
        }
        return next();
    }); */
    if(url === '/login') {
        return next(); //callback(null, "Next");
    }
    if(typeof userSession === "undefined") {
        return res.json({
            status: false,
            message: "Unauthorised Request"
        }) //callback("Unauthorised Request");
    }
    return next();//callback(null, "Next");
}; 
module.exports = authRoute;