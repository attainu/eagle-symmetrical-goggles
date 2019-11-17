const mongoose = require('mongoose');
const Myuser = require("./users_model");

function connect(){
    return mongoose.connect('mongodb+srv://r4id:khuljasimsim@r4id-cluster-fwjpl.mongodb.net/test?retryWrites=true&w=majorit',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {
    models:{
        User: Myuser
    },
    connect: connect
};