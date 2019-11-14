const FeedController = {};
const moment = require('moment');
const FeedModel = require('./../models/Feedpage.js');
var arr = [];
var dataArr = [];
FeedController.getFeed = function (request, response) {
    return response.render('feedPage.hbs', {
        status: true,
        feedtime: moment().format('LLLL')
    });
}
FeedController.postStatus = function (request, response) {
    var data1 = request.body.user;
    console.log("data1", data1);
    arr = data1;
    return response.render('feedPage',{
        post: arr,
        status: true,
        message: "Post updated successfully!",
        postime: moment().format('LLLL')
    });
}
FeedController.postFiles = function (request, response) {
    dataArr = request.files['imageFile'][0];
    //console.log(dataArr);
    //console.log("imageFiles:",dataArr.path);

    return response.render('feedPage',{
        data: dataArr,
        status: true,
        message: "Media posted successfully!",
        postime: moment().format('LLLL')
    });
}

module.exports = FeedController;