
const mongoose = require('mongoose');

var user_model = require('./users_model');
var post_model = require('./posts_model');
var job_model = require('./jobs_model');


function mongodbconnect(){
    return mongoose.connect('mongodb://localhost:27017/whitecollardb',{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true }, 
        function(error){
            if(!error){
                console.log('connected successfully')
            }else{
                console.log(error)
            }
    });
}

module.exports = {
    models:{
        Post: post_model,
        User: user_model,
        Job: job_model
    },
    connect: mongodbconnect
}