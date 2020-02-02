const JobModel = require('./../models/Jobs.js');
const User = require('./../models/Users.js');
const JobController = {};

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
                    return res.render('Jobsearch', {
                        title: "Job Section",
                        css_file_ref: "css/jobsearch.css",
                        status: true,
                        msg: "OOPS Something Went Wrong!",
                    });
                }
                console.log(data);
               /*  return res.render('Jobsearch', {
                    title: "Job Section",
                    css_file_ref: "css/jobsearch.css",
                    status: true,
                    msg: "You Applied for the Job Succesfully",
                }); */
                return res.send({msg:"You applied to the Job Successfully"})
            })
        })
    }
}

module.exports = JobController;