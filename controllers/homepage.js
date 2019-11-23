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
    }, function (error, data) {
        if (error) console.log("FAiled to save post to database. Error", error);
        console.log("added to database", data);
    });
    FeedModel.find({}, function (error, data) {
        if (error) console.log(error);
        // console.log(data);
        return res.redirect('/');
    });
};
//For like and dislike
FeedController.likeDislike = function (req, res) {
    var id = req.params.id;
    console.log("post ID:", id);

    FeedModel.findById(req.params.id, function (error, data) {
        if (error) console.log(error);
        console.log("Post", data);
        // console.log("type:",typeof data.likes);
        var uName = data.name;
        if (data.likes.likedBy.some(function (elem) {
           return (elem == uName);
        }) == true) {
            data.likes.likeCount = data.likes.likeCount - 1;
            data.likes.likedBy = data.likes.likedBy.filter(function (x) {
                if (x != uName)
                    return x;
            });
        }
        else {
            data.likes.likeCount = data.likes.likeCount + 1;
            data.likes.likedBy.push(data.name);
        }
        console.log("LikedBy", data.likes.likedBy);
        console.log("likeCount",data.likes.likeCount);
        
        data.save(function (err) {
            if (error) console.log("Unable to save count in database", error);
        });
        // res.status(200).redirect('/');
        res.send({likeCount: data.likes.likeCount});
    });
};
module.exports = FeedController;