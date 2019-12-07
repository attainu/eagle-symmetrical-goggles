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
        if(data.followers){
            var check = (data.followers).includes(myEmail);
        }
        console.log("from otherprofile check>>>",check)
        console.log("from ohter profile data>>>>",data);
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
            check,
            css_file_ref: "css/profile.css",
            script: "/js/follow.js"
        })
    })
}    

module.exports = OtherProfileController;