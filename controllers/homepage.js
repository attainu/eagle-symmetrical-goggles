require('dotenv').config();
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
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

FeedController.getFeed = function (req, res) {
    var user = req.session.user;
    // console.log("user login details>>",req.session);
    UserModel.find({ email: user }, function (error, response) {
        if (error) {
            console.log(error);
            return error;
        }
        // console.log(response);

        var fullname = response[0].firstname + ' ' + response[0].lastname;
        var email = response[0].email;
        var followers = response[0].followers.length;
        var following = response[0].following.length;
        var Skills = [];
        response[0].skills.forEach(function (item, index) {
            Skills.push(item);
        });

        FeedModel.find({}, function (error, data) {
            if (error) {
                res.status(500).send({
                    status: false,
                    message: error
                });
            }
            // console.log("Feed data>>", data);
            var numberOfPosts = data.length;
            return res.render('homepage', {
                status: true,
                title: "feedpage",
                profileName: fullname,
                email: email,
                followers: followers,
                following: following,
                numberOfPosts: numberOfPosts,
                Skills: Skills,
                userData: data.reverse(),
                script: '/js/homepage.js'
            });
        });
    });
};
// For posting status and images
FeedController.addPost = async function (req, res) {
    var userEmail = req.session.user;
    console.log("User details to create posts", req.session);
    var userPost = req.body.usersPost;
    var fullname = null;
    await UserModel.find({ email: userEmail }, function (error, response) {
        if (error) console.log(error);
        fullname = response[0].firstname + " " + response[0].lastname;
    });
    var cloudinaryUrl = null;
    if (req.files['imagefile']) {
        var imgUrl = req.files['imagefile'][0].path;
        console.log(imgUrl);
        // var __source = tinify.fromFile(imgUrl);
        // __source.toFile(imgUrl);
        //uploading to cloudinary
        await cloudinary.uploader.upload(imgUrl, function (error, response) {
            if (error) {
                console.log(error);
                return error;
            }
            console.log("response cloudinary", response);
            cloudinaryUrl = response.url;
            console.log("cloudinaryUrl", cloudinaryUrl);
        });
    }
    // console.log("outside", cloudinaryUrl);
    FeedModel.create({
        name: fullname,
        email: userEmail,
        post: userPost,
        imageUrl: cloudinaryUrl
    }, function (error, data) {
        if (error) {
            console.log("FAiled to save post to database. Error", error);
            return error;
        }
        console.log("added to database", data);
    });
    return res.redirect('/');
};

// //For like and dislike
// FeedController.likeDislike = function (req, res) {
//     // var id = req.params.id;
//     // console.log("post ID:", id);
//     var uName = req.session.user;
//     FeedModel.findById(req.params.id, function (error, data) {
//         if (error) console.log(error);
//         console.log("Post", data);
//         // console.log("type:",typeof data.likes);
//         // var uName = data.email;
//         var flag = 0;
//         if (data.likes.likedBy.some(function (elem) {
//             return (elem == uName);
//         }) == true) {
//             data.isLiked = null;
//             data.likes.likeCount = data.likes.likeCount - 1;
//             data.likes.likedBy = data.likes.likedBy.filter(function (x) {
//                 if (x != uName)
//                     return x;
//             });
//         }
//         else {
//             data.isLiked = true;
//             flag = 1;
//             data.likes.likeCount = data.likes.likeCount + 1;
//             data.likes.likedBy.push(uName);
//         }
//         console.log("isLiked", data.isLiked);
//         console.log("LikedBy", data.likes.likedBy);
//         console.log("likeCount", data.likes.likeCount);

//         data.save(function (err) {
//             if (err) console.log("Unable to save like count in database", err);
//         });
//         res.send({
//             likeCount: data.likes.likeCount,
//             flag: flag
//         });
//     });
// };

//For like and dislike
FeedController.likeDislike = function (req, res) {
    var uName = req.session.user;
    var flag = 0;
    // var likeCount;
    FeedModel.findById(req.params.id, async function (error, data) {
        if (error) {
            console.log(error);
            return error;
        }
        console.log("Liked Post", data);
        // var flag = 0;
        var alreadyLiked = data.likes.likedBy.some(function (elem) {
            console.log("check-0.0");
            return (elem == uName);
        });
        if (alreadyLiked == true) {
            console.log("check-1.1");
            data.isLiked = false;
            data.likes.likeCount = data.likes.likeCount - 1;
            data.likes.likedBy = data.likes.likedBy.filter(function (x) {
                if (x != uName)
                    return x;
            });
        }
        else {
            console.log("check-1.2");
            data.isLiked = true;
            flag = 1;
            data.likes.likeCount = data.likes.likeCount + 1;
            data.likes.likedBy.push(uName);
        }
        console.log("isLiked", data.isLiked);
        console.log("LikedBy", data.likes.likedBy);
        console.log("likeCount", data.likes.likeCount);

        await data.save(function (error) {
            if (error) {
                console.log("Unable to save like count in database.Error>>", error);
                return error;
            }
            console.log("like count saved in database");
        });
        return res.send({
            likeCount: data.likes.likeCount,
            flag: flag
        });
    });
};

// For commenting on post
FeedController.postComment = function (req, res) {
    var comment = req.body.addComment;
    var userEmail = req.session.user;
    console.log("posted comment", comment);
    console.log("req.body", req.body);
    console.log("userEmail", userEmail);
    console.log("req.params.id", req.params.id);
    var fullname = null;
    UserModel.find({ email: userEmail }, function (error, response) {
        if (error) {
            console.log("can not find user from database. Error>>>", error);
            return error;
        }
        fullname = response[0].firstname + " " + response[0].lastname;
        var commentData = {
            commentedBy: fullname,
            comment: comment
        };
        FeedModel.find({}, function (error, data) {
            if (error) {
                console.log("Can not find req.param.id from database. Error>>>", error);
                return error;
            }
            console.log("comment response", data);
            console.log("response.comments", data[0].comments);
            data[0].comments.push(commentData);
            console.log("after comment response", data);
            console.log("after response.comments", data[0].comments);
            data[0].save(function (error) {
                if (error) {
                    console.log("Unable to save comments in database", error);
                    return error;
                }
                console.log("Comment saved to database");
            });
        });
    });
    res.redirect('/');
}

module.exports = FeedController;
