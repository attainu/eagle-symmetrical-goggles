const FeedController = {};
const moment = require('moment');
//const FeedModel = require('./../models/Feedpage.js');
var data = [
    {
        userName: "afroz",
        post: "Hey white collor! This is my first post!",
        time: moment( 1573368600000 ).format('LLL')
    }
];

FeedController.getFeed = function (request, response) {
    return response.render('feedPage.hbs', {
        status: true,
        userData: data
    });
};

FeedController.addPost = function (request, response) {
    var userData = request.body;
    console.log("POST>>", userData);
    data.unshift(userData);
    console.log(data);
    return response.json(data);
};

FeedController.postFiles = function (request, response) {
    var imageUrl = request.files['imageFile'][0].path;
    console.log("url",imageUrl);
    console.log(request.files['imageFile'][0]);

    return response.render('feedPage',{
        data: imageUrl,
        status: true,
        message: "Media posted successfully!",
        postime: moment().format('LLLL')
    });
}

module.exports = FeedController;