const AuthController = {};
const Model = require('./../models/Auth.js');

AuthController.login = function(req, res) {
    var email = req.body.email;
    var plain_password = req.body.password;
    //console.log(email, password);
    Model.login(email, plain_password, function(error, login){   
        if (error) {
            res.status(500).send(error);
        }
        if(login == true){
            console.log('Successfully logged in');
            req.session.user = email;
            setTimeout(function(){          //to mimmick latency and let animations flow
                return res.redirect('/');
            },40);
        }
        if(login == false){
            res.status(500).render('login',{
                msg: "Invalid Credantials",
                css_file_ref: '/css/login.css',
                layout:false
            })
            // setTimeout(function(){
            //     return res.redirect('/login')//res.status(401).send('Invalid Credentials'); // Add bs4 alerts sequence
            // },20);
        }
    
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
    res.clearCookie('somename');
    return res.redirect('/login');
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