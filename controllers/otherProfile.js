const OtherProfileController =  {};
const Users = require('../models/Users.js');
const Post = require('../models/Homepage.js');

OtherProfileController.seeProfile = function(req, res) {
    var userEmail = req.query.user;
    var myEmail = req.session.user; //need this to show follow/unfollow button
    Users.findOne({"email": userEmail}, function(error, data) {
        if(error){
            res.send({
                status: false,
                message: error
            })
        }
        if(data.followers){
            var check = (data.followers).includes(myEmail);
        }
        Post.find({"email": userEmail}, function (err, allpost){
            if(err){
                return res.send({msg: err})
            }
            var totalPost = allpost.length;
            var email = data.email;
            var name = data.firstname +" "+ data.lastname;
            var skills = data.skills;
            var followers = data.followers;
            var following = data.following;
            var summary = data.bioSummary;
            var age = data.age;
            var city = data.city;
            var phone = data.phone
            var job = data.jobs[0];
            var project = data.projects[0];
            return res.render('otherProfile',{
                email, userEmail,
                summary,phone,
                skills, name, followers, following, job, project,
                data,age,city,
                check, totalPost,
                css_file_ref: "css/profile.css",
                script: "/js/follow.js"
            });
        });
    });
}    

module.exports = OtherProfileController;