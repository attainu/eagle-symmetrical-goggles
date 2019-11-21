const FeedController = {};
const FeedModel = require('./../models/Homepage.js');
const tinify = require('tinify');
tinify.key = "5lbMCxrQywrPhJ6RNBQ46BZ7DNjFWqGh";


FeedController.getFeed = function (req, res) {
    FeedModel.find({}, function (error, data) {
        if (error) {
            res.status(500).send({
                status: false,
                message: error
            });
        }
        // console.log(data);
        return res.render('homepage', {
            status: true,
            userData: data.reverse()
        });
    });
};
// For posting status and images
FeedController.addPost = function (req, res) {
    var userPost = req.body.usersPost;
    // console.log("POST>>", typeof userPost);
    var imgUrl = null;
    if (req.files['imagefile']) {
        imgUrl = req.files['imagefile'][0].path;
        console.log("url>>", imgUrl);
        var __source = tinify.fromFile(imgUrl);
        __source.toFile(imgUrl);
        imgUrl = imgUrl.replace("public/", "");
    }
    FeedModel.create({
        name: "afroz",
        post: userPost,
        imageUrl: imgUrl
    })
     FeedModel.find({}, function (error, data) {
         if (error) {
             console.log(error);
             // res.status(500).send({
             //     status: false,
             //     message: error
             // });
         }
         // console.log(data);
         return res.redirect('/');
     });
};
//For like and dislike
FeedController.likedislike = function (req, res) {
    var id = req.params.id;
    console.log("req.params.id:", id);
    FeedModel.findById(req.params.id, function (error, data) {
        if (error) {
            console.log(error);
            return res.send(error);
        }
        console.log(data.likes);
        console.log(data.likes[0]['likedBy']);
        
        data.likes[0].likeCount += 1;
        data.likes[0]['likedBy'].userId = id;
        // console.log("from likedislike", data);
        console.log(data.likes);


        data.save(function (err) {
            if (error) return res.status(500).send(error);
            console.log("no. of likes", data.likes[0].likeCount);
            return res.send({
                likeCount: data
            });
        });
    });
};
// get the click data from the database
// app.get('/clicks', (req, res) => {
// FeedController.getLike = function (req,res) {
//     FeedModel.find({}, funcion (error, data){
//         if (err) return console.log(err);
//         res.send(result);
//     });
// }

module.exports = FeedController;