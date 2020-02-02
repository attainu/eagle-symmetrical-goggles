const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true
    },
    experience: {
        type: String,
    },
    companyName: {
        type: String,
    },
    place: {
        type: String
    },
    applied: {
        type: Array
    }    
},{
    collection: 'jobs'
});

const Jobs = mongoose.model('Job', JobSchema);
module.exports = Jobs;