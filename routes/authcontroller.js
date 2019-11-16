
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

module.exports = authRoute;