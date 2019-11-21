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
        return res.render('jobsearch', {
            title: "Job Section",
            css_file_ref: "css/jobsearch.css",
            status: true,
            message: "Success",
        });
    });
}

Jobsection.retrievejob = function(req, res){

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
        return res.render('jobsearch',{
            title: "Job Section",
            css_file_ref: "css/jobsearch.css",
            result: response
        })
    });
}

module.exports = Jobsection;