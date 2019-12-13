const User = require('../models/Users.js');
// const bcrypt = require('bcrypt');
const ProfileEdit = {};

ProfileEdit.edituser = function(request, response){
    var email = request.body.email;
    var dataFromUser = request.body;
            User.updateMany({
                "email" : email
            }, {
                "$set": dataFromUser
            }, function(error, res){
                if(error){
                    return console.log("error");
                }
                return response.redirect('/profile');
            });
    }

ProfileEdit.showInfo = function(req, res) {
    var userSession = req.session.user;
    // console.log(userSession);
    User.findOne({"email": userSession}, function(error, data) {
        if(error) {
            return res.send({msg: error})
        }
        if(data){

            var email = data.email;
            var firstname = data.firstname;
            var lastname = data.lastname;
            var phone = data.phone;
            var city = data.city;
            var age = data.age;
            var bioSummary = data.bioSummary;

            console.log(data);
            if(data.projects[0]){
                var projects = data.projects[0];
                var projectTitle = projects.projectTitle;
                var projectSummary = projects.projectSummary;
            }
            if(data.jobs[0]){
                var jobs = data.jobs[0];
                var companyName = jobs.companyName;
                var designation = jobs.designation;
                var workExperience = jobs.workExperience;
                var jobSummary = jobs.jobSummary;
            };
            if(data.skills){
                var skills = data.skills;
                var skill1 = skills[0];
                var skill2 = skills[1];
                var skill3 = skills[2];
            }
        }

        return res.render('profileEdit', {
            title: "Edit Profile",
            css_file_ref: "css/profileEdit.css",
            firstname: firstname,
            lastname: lastname,
            email: email,
            city: city,
            phone: phone,
            age: age,
            bioSummary: bioSummary,
            skill1: skill1,
            skill2: skill2,
            skill3: skill3,
            projectTitle: projectTitle,
            projectSummary: projectSummary,
            companyName: companyName,
            designation: designation,
            workExperience: workExperience,
            jobSummary: jobSummary
        });
    });
}

module.exports = ProfileEdit;