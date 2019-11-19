const mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    datecreated: {
        type: Date
    }    
},
{
    collection:'sobrad_jobs'
});

var Job = mongoose.model('Job', JobSchema);
module.exports = Job;