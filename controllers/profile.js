const User = require('../models/Users.js');
const Post = require('../models/Homepage.js');

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
        Post.find({"email": userSession}, function (err, allpost){
            if(err){
                return res.send({msg: err})
            }
            console.log('total post length are>>>',allpost.length);
            var totalPost = allpost.length;
            var email = data.email;
            var name = data.firstname +" "+ data.lastname;
            var skills = data.skills;
            var followers = data.followers;
            var following = data.following;
            var summary = data.bioSummary;
            var age = data.age;
            var city = data.city;
            var phone = data.phone;
            var job = data.jobs[0];
            var project = data.projects[0];
            //console.log(summary);
            return res.render('profile', {
                css_file_ref: "css/profile.css",
                email,age, city, phone,
                summary,
                skills, name, followers, following, job, project, totalPost
            })
        });
        // console.log('total post length outside are>>>',totalPost);
    })
}

module.exports = Profile;