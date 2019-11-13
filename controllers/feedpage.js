const FeedController = {};
const moment = require('moment');
const FeedModel = require('./../models/Feedpage.js');

FeedController.getFeed = function (request, response) {
    return response.render('feedPage.hbs',
    {
        feedtime: moment().format('LLLL')
    });
}
FeedController.statusPost = function (request,response) {
    FeedModel(function (error, data) {
       console.log(error,data);
       if(error){
           return response.status(500).send(error);
       }
       return response.render('',
       {
           message:data,
           posttime: moment().format('LLLL')
       });
    });
}

module.exports = FeedController;