const JobModel = require('./../models/Jobs.js');
const User = require('./../models/Users.js');
const JobController = {};

JobController.checkIfApplied = function(req, res, next) {
    var applicantEmail = req.session.user;
    var jobId = req.query.jobId;
    JobModel.findOne({'applied': {$elemMatch: {email: applicantEmail}}}, function (err, user) {
        if (err){
            return res.send(err);
        }    

        if (user) {
            console.log("Applied Already");
            req.applied = true;
            next();

        } else {
            req.applied = false;
            console.log("You can apply");
            next();

        }
    });
}


JobController.applyJob = function(req, res) {
    //console.log(req.body);
    var applicantEmail = req.session.user;
    var jobId = req.query.jobId;
    console.log(jobId);
    console.log(req.applied);
    if(!req.applied){
        User.findOne({"email": applicantEmail}, function(error, data) {
            if(error) {
                return res.send({msg: error})
            }
            //console.log(data);
            var applicant = new Object();
            applicant.email = data.email;
            applicant.name = data.firstname +" "+ data.lastname;
            applicant.skills = data.skills;
            applicant.summary = data.bioSummary;
            applicant.job = data.jobs[0];
            applicant.project = data.projects[0];

            JobModel.findOneAndUpdate({_id: jobId}, {$push: {applied : applicant} },{useFindAndModify: false}, function(error, data) {
                if(error) {
                    return res.send({msg: error})
                }
                console.log(data);
                return res.send({
                    status : true,
                    meessage: "applied to job successfully"
                })
            })
        })
    }
}

module.exports = JobController;