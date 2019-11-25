const FeedController = {};
const FeedModel = require('./../models/Homepage.js');
const UserModel = require('./../models/Users.js');

const tinify = require('tinify');
tinify.key = "5lbMCxrQywrPhJ6RNBQ46BZ7DNjFWqGh";

// Import async
const async = require('async');

// Import and set cloudinary configuration
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'afroz-123',
    api_key: '338816749926228',
    api_secret: '180UVM9lzftZrmsTwn2RzATwYNo'
});

FeedController.getFeed = function (req, res) {
    // var user = req.session.user;
    UserModel.find({ email: '123afz@gmail.com' }, function (error, response) {
        // console.log(response);

        if (error) console.log(error);
        var fullname = response[0].firstname;
        var email = response[0].email;
        var followers = response[0].followers.length;
        var following = response[0].following.length;
        var Skills = [];
        response[0].skills.forEach(function (item, index) {
            Skills.push(item);
        });
        // console.log(fullname, username, followers, following);

        FeedModel.find({}, function (error, data) {
            if (error) {
                res.status(500).send({
                    status: false,
                    message: error
                });
            }
            // console.log(data);
            var numberOfPosts = data.length;
            // console.log(numberOfPosts);

            return res.render('homepage', {
                status: true,
                title: "feedpage",
                profileName: fullname,
                email: email,
                followers: followers,
                following: following,
                numberOfPosts: numberOfPosts,
                Skills: Skills,
                userData: data.reverse()
            });
        });
    });
};
// For posting status and images
FeedController.addPost = function (req, res) {
    var userPost = req.body.usersPost;
    var cloudinaryUrl = null;
    var files = req.files['imagefile'];
    if (req.files['imagefile']) {
        var imgUrl = req.files['imagefile'][0].path;
        console.log(imgUrl);
        // var url = imgUrl.replace("/public", "");
        // var __source = tinify.fromFile(imgUrl);
        // __source.toFile(imgUrl);
        //uploading to cloudinary
        async.map(files, function (file, callback) {
            cloudinary.uploader.upload(imgUrl, function (error, response) {
                if (error) return callback(error);
                cloudinaryUrl = response.url;
                console.log("cloudinaryUrl", cloudinaryUrl);
                console.log("Image uploaded ", response);
                return callback(null, response);
            });
        }, function (error, result) {
            console.log("outside", cloudinaryUrl);
            FeedModel.create({
                name: "afroz",
                post: userPost,
                imageUrl: cloudinaryUrl
            }, function (error, data) {
                if (error) console.log("FAiled to save post to database. Error", error);
                console.log("added to database", data);
            });
            FeedModel.find({}, function (error, data) {
                if (error) console.log(error);
                // console.log(data);
                return res.redirect('/');
            });
        });
    }
    else {
        FeedModel.create({
            name: "afroz",
            post: userPost,
            imageUrl: cloudinaryUrl
        }, function (error, data) {
            if (error) console.log("FAiled to save post to database. Error", error);
            console.log("added to database", data);
        });
        FeedModel.find({}, function (error, data) {
            if (error) console.log(error);
            // console.log(data);
            return res.redirect('/');
        });
    }
};
//For like and dislike
FeedController.likeDislike = function (req, res) {
    var id = req.params.id;
    // console.log("post ID:", id);

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
        console.log("likeCount", data.likes.likeCount);

        data.save(function (err) {
            if (err) console.log("Unable to save count in database", err);
        });
        res.send({ likeCount: data.likes.likeCount });
    });
};

module.exports = FeedController;
