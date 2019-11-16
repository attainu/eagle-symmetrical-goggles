const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    domain: {
        type: String,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    address: {
        type: String
    }    
},{
    collection: 'jobs'
});

const Jobs = mongoose.model('Job', JobSchema);
module.exports = Jobs;