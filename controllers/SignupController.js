const appcontroller = {};

const AppModel = require('../models/SingupModels.js');

appcontroller.post = function(req,res){
	// console.log(req);
    var Firstname = req.body.firstname;
	var Lastname = req.body.lastname;
	var Gender = req.body.gender;
	var Mobilenumber = req.body.mobilenumber;
	var Email = req.body.email;
	var Password= req.body.password;
	var Confirmpassword = req.body.confirmpassword;
	var db = req.app.locals.db;
	Data = {
		firstname:Firstname,
		lastname:Lastname,
		gender:Gender,
		mobilenumber:Mobilenumber,
		email:Email,
		username:Email,
		password:Password,
		confirmpassword:Confirmpassword
	}
	console.log(Data);
	AppModel.post(Data,db,function(error,info){
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).send(info);
    });
}







module.exports = appcontroller;