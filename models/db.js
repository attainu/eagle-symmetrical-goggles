
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true, useUnifiedTopology: true }, function(error){
    if(!error){
        console.log('connected successfully')
    }else{
        console.log(error)
    }
});