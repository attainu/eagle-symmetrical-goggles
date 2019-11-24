const User = require('../models/Users.js');

const Profile = {};

Profile.currentProfile = function(req, res) {
    var userSession = req.session.user;
   // var userSession = 'rupesh@gmail.com'; //for testing
    console.log(userSession);
    User.findOne({"email": userSession}, function(error, data) {
        if(error) {
            return res.send({msg: error})
        }
        //var username = data.username;
       // data = JSON.stringify(data);
       console.log(data);
        var email = data.email;
        var name = data.firstname +" "+ data.lastname;
        var skills = data.skills;
        var followers = data.followers;
        var following = data.following;
        var summary = data.bioSummary;
        var job = data.jobs[0];
        var project = data.projects[0];
        //console.log(summary);
        return res.render('profile', {
            email,
            summary,
            skills, name, followers, following, job, project
        })
    })
}

module.exports = Profile;