const Job = require('../models/Jobs.js');

const Jobsection = {};

Jobsection.createnewjob = function(req, res){
    Job.create({
        title: req.body.title,
        place: req.body.place,
        companyName: req.body.companyname,
        experience: req.body.experience,
    }, function(error, response){
        if(error){
            return res.send({
                status: false,
                message: "unable to write this data"
            });
        }
        return res.render('Jobsearch', {
            title: "Job Section",
            css_file_ref: "css/jobsearch.css",
            status: true,
            msg: "Your Job is posted Succesfully",
        });
    });
}

Jobsection.retrievejob = function(req, res){
    var applied = req.applied;   
    Job.find({
        title: req.query.titletosearch,
        place: req.query.placetosearch
    }, function(error, response){
        if(error){
            return res.send({
                status: false,
                message: "unable to get jobs data"
            });
        }
        return res.render('Jobsearch',{
            title: "Job Section",
            css_file_ref: "css/jobsearch.css",
            result: response,
            applied
        })
    });
}
Jobsection.checkIfApplied = function(req, res, next) {
    var applicantEmail = req.session.user;
    Job.findOne({'applied': {$elemMatch: {email: applicantEmail}}}, function (err, user) {
       console.log(user);
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
module.exports = Jobsection;