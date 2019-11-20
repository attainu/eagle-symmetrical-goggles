
const mongoose = require('mongoose');

var ModelUsers = require('./UsersModel');
var ModelPosts = require('./PostsModel');
var ModelJobs = require('./JobsModel');


function mongodbconnect(){
    return mongoose.connect('mongodb://localhost:27017/sobrad',{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true }, 
        function(error){
            if(!error){
                console.log('MonogoDB Connected successfully')
            }else{
                console.log(error)
            }
    });
}

module.exports = {
    models:{
        Post: ModelPosts,
        User: ModelUsers,
        Job: ModelJobs
    },
    connect: mongodbconnect
}