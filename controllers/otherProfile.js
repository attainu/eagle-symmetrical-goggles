const OtherProfileController =  {};
const Users = require('../models/Users.js');

OtherProfileController.seeProfile = function(req, res) {
    console.log("get seeprofile....")
    var userEmail = req.query.user;
    var myEmail = req.session.user; //need this to show follow/unfollow button
    console.log(userEmail);
    Users.findOne({"email": userEmail}, function(error, data) {
        if(error){
            res.send({
                status: false,
                message: error
            })
        }
        var check = (data.followers).includes(myEmail);
        console.log(check)
        // console.log(data);
        return res.render('otherProfile',{
            userEmail,
            data,
            check,
            script: "/js/follow.js"
        })
    })
}    

module.exports = OtherProfileController;