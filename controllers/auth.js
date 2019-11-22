const AuthController = {};
const Model = require('./../models/Auth.js');

AuthController.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password);
    Model.login(email, password, function(error, data){   
        if (error) {
            res.send({
                status: false,
                message: error
            })
        }
       // console.log(data);
        //req.session.loggedIn = true;
        //req.session.user = data.email;
        if(!data) {
            return res.status(500).json(
				{
					status: false,
					message: "Invalid Credentials"
				}
			);
        }
        req.session.user = data.email;
        console.log(req.session.user);
        return res.status(200).json(
			{
				status: true,
				message: "Login successfull"
			}
        );
    
    })
}
    
       /* When login.hbs and home.hbs is ready uncomment this code and comment res.status block
        if (!req.session.loggedIn) {
            res.render('login.hbs', { alert: "Invalid Credentials"});
        } else {
            res.redirect('/home');
        } */


AuthController.logout = function(req, res) {
    var session = req.session;
    session.destroy();
    res.clearCookie('Somename');
    return res.send({
        status: true,
        message: "Logged out"
    });
};

AuthController.checkIfLoggedIn = function(req, res, next) {
    var url = req.originalUrl;
    var userSession = req.session.user;
    
    Model.checkIfLoggedIn(url, userSession, function(error, data) {
        if(error) {
            return res.redirect('/login')
        }
        return next();
    });
}; 

module.exports = AuthController;