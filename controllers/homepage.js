//require('dotenv').config();

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
    cloud_name: process.env.CLOUD_NAME || "eagle-whitecollar",
    api_key: process.env.API_KEY || "416478242371149",
    api_secret: process.env.API_SECRET || "bgO2gVKgNDQAnx5RY2yJlUG7fpM"
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
        var profileImageurl = response[0].profileImageUrl;
        console.log("profileImageurl>>",profileImageurl);
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
                title: "WhiteCollar/Home",
                profileName: fullname,
                email: email,
                followers: followers,
                following: following,
                profileImageurl: profileImageurl,
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
    console.log("req.files>>>", req.files);
    await UserModel.find({ email: userEmail }, function (error, response) {
        if (error) console.log(error);
        fullname = response[0].firstname + " " + response[0].lastname;
    });
    var cloudinaryImgUrl = null;
    var cloudinaryPdfUrl = null;
    var cloudinaryVideoUrl = null;
    if (req.files['imagefile']) {
        var imgUrl = req.files['imagefile'][0].path;
        console.log("imgUrl>>>", imgUrl);
        // var __source = tinify.fromFile(imgUrl);
        // __source.toFile(imgUrl);
        //uploading to cloudinary
        await cloudinary.uploader.upload(imgUrl, function (error, response) {
            if (error) {
                console.log("image file not uploaded to cloudinary>>", error);
                return error;
            }
            console.log("response from image section cloudinary", response);
            cloudinaryImgUrl = response.url;
            console.log("cloudinaryUrl", cloudinaryImgUrl);
        });
    }
    // console.log("outside", cloudinaryUrl);

    if (req.files['pdffile']) {
        var pdfUrl = req.files['pdffile'][0].path;
        console.log("PDF url>>>", pdfUrl);
        await cloudinary.uploader.upload(pdfUrl, function (error, response) {
            if (error) {
                console.log("pdf file not uploaded to cloudinary>>", error);
                return error;
            }
            console.log("response from pdf section cloudinary", response);
            cloudinaryPdfUrl = response.url;
            console.log("cloudinaryPdfUrl", cloudinaryPdfUrl);
        });
    }
    if (req.files['videofile']) {
        var videoUrl = req.files['videofile'][0].path;
        console.log("PDF url>>>", videoUrl);
        await cloudinary.uploader.upload(videoUrl,{resource_type: "video" }, function (error, response) {
            if (error) {
                console.log("video file not uploaded to cloudinary>>", error);
                return error;
            }
            console.log("response from video section cloudinary", response);
            cloudinaryVideoUrl = response.url;
            console.log("cloudinaryVideoUrl", cloudinaryVideoUrl);
        });
    }
    console.log("outside", cloudinaryPdfUrl);

    FeedModel.create({
        name: fullname,
        email: userEmail,
        post: userPost,
        imageUrl: cloudinaryImgUrl,
        pdfUrl: cloudinaryPdfUrl,
        videoUrl: cloudinaryVideoUrl
    }, function (error, data) {
        if (error) {
            console.log("FAiled to save post to database. Error", error);
            return error;
        }
        console.log("added to database", data);
    });
    return res.redirect('/');
};


//For like and dislike (Fixed, Don't make any changes now)
FeedController.likeDislike = function (req, res) {
    var uName = req.session.user;
    var id = req.params.id;

    FeedModel.findById(id, function (error, data) {  //here i get post data
        if (error) {
            console.log(error);
            return error;
        }
        // post id data got by req.params.id
        console.log("Liked Post", data);
        if (data.likedBy === null || data.likedBy.includes(uName) === false) {
            FeedModel.findByIdAndUpdate(req.params.id, { $push: { likedBy: uName } }, function (err, docs) {
                if (err) {
                    return console.log("like update m error>>", err);
                }
                console.log("like complete", docs);
                var flag = 1;
                return res.send({
                    flag: flag
                });
            });
        }
        var checking = data.likedBy.includes(uName);

        if (checking === true) {
            FeedModel.findByIdAndUpdate(req.params.id, { $pull: { likedBy: uName } }, function (err, docs) {
                if (err) {
                    console.log("dislike update m error>>", err);
                    return err;
                }
                console.log("you disliked this", docs);
                var flag = 0;
                return res.send({
                    flag: flag
                });
            });
        }
    });
}

// For commenting on post
FeedController.postComment = function (req, res) {
    var comment = req.body.comment;
    var userEmail = req.session.user;
    var id = req.params.id;
    console.log("posted comment", comment);
    console.log("req.body", req.body);
    console.log("userEmail", userEmail);
    console.log("req.params.id", id);
    UserModel.find({ email: userEmail }, function (error, response) {
        if (error) {
            console.log("can not find user's full name from database. Error>>>", error);
            return error;
        }
        var fullname = response[0].firstname + " " + response[0].lastname;
        var commentedData = {
            commentedBy: fullname,
            comment: comment
        };
        FeedModel.findByIdAndUpdate(id, { $push: { comments: commentedData } }, function (error, commentData) {
            if (error) {
                console.log("Can not update coment to database. Error>>>>", error);
                return error;
            }
            console.log("comment updated to database", commentData);
            res.send({ comment: "comment saved" });
        });
    });
}
module.exports = FeedController;