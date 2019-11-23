const User = require('../models/Users.js');

const Profile = {};

Profile.currentProfile = function(req, res) {
    var userSession = req.session.user;
   // console.log(userSession);
    User.findOne({"email": userSession}, function(error, data) {
        if(error) {
            return res.send({msg: error})
        }
        //var username = data.username;
       // data = JSON.stringify(data);
        var email = data.email;
        var username = data.username;
        var name = data.fullname;
        var skills = data.skills;
        return res.render('profile', {
            email,
            username,
            skills
        })
    })
}

module.exports = Profile;