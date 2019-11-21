const User = require('../models/Users.js');

const ProfileEdit = {};

ProfileEdit.edituser = function(request, response, cb){
    var email = request.body.email;
    // console.log(email);
    var password = request.body.password;
    var dataFromUser = request.body;
    User.findOne({"email": email},function(error, doc){
        if(error){
            console.log(error);
            return cb({
                status: false,
                message: "failed to load data"
            });
        }
        // console.log(dataFromUser);
        // console.log(doc);

        if(doc.password!==password){
            return cb({
                status: false,
                message: "Error! Password not matched"
            });
        }
        User.updateMany({
            "email" : email
        }, {
            "$set": dataFromUser
        }, function(error, res){
            if(error){
                return console.log("error");
            }
            return res.redirect('/profile-edit');
        });
    });
}

ProfileEdit.showInfo = function(req, res) {
    var userSession = req.session.user;
    // var userSession = "shubhamss.saurav@gmail.com";  //for testing

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
            if(data.projets){
                var projects = data.projects[0];
                var projectTitle = projects.projectTitle;
                var projectSummary = projects.projectSummary;
            };
            if(data.jobs){
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