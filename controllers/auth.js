const AuthController = {};
const Model = require('./../models/Auth.js');

AuthController.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var db = req.app.locals.db;
    
    Model.login(email, password, db, function(error, data) {
        if(error) {
			return res.status(500).json(
				{
					status: false,
					error
				}
			);
        }
        req.session.loggedIn = true;
        req.session.user = data.email;
        if(!req.session.loggedIn) {
            return res.status(500).json(
				{
					status: false,
					message: "Invalid Credentials"
				}
			);
        }
        return res.status(200).json(
			{
				status: true,
				message: "Login successfull"
			}
        );
       /* When login.hbs and home.hbs is ready uncomment this code and comment res.status block
        if (!req.session.loggedIn) {
            res.render('login.hbs', { alert: "Invalid Credentials"});
        } else {
            res.redirect('/home');
        } */
    });
}

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
            return res.json({
                status: false,
                message: error
            })
        }
        return next();
    });
}; 

module.exports = AuthController;