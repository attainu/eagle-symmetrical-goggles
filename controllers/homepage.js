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
    var userDtails = req.session;
    // console.log("login details>>",userDtails);
    UserModel.find({ email: user }, function (error, response) {
        // console.log(response);

        if (error) console.log(error);
        var firstname = response[0].firstname;
        var lastname = response[0].lastname;
        var fullname = firstname + ' ' + lastname;
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
            // console.log("Feed data>>", data);
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
                userData: data.reverse(),
                script: '/js/homepage.js'
            });
        });
    });
};
// For posting status and images
FeedController.addPost = async function (req, res) {
    // console.log("request:>>", req.files);
    var userEmail = req.session.user;
    var user = req.session;
    console.log("User details to create posts", user);
    var userPost = req.body.usersPost;
    var fullname = null;
    await UserModel.find({ email: userEmail }, function (error, response) {
        if (error){
            return console.log(error);
        }
        fullname = response[0].firstname + " " + response[0].lastname;
    });
    var cloudinaryUrl = null;
    // var files = req.files['imagefile'];
    if (req.files['imagefile']) {
        var imgUrl = req.files['imagefile'][0].path;
        console.log(imgUrl);
        // var url = imgUrl.replace("/public", "");
        // var __source = tinify.fromFile(imgUrl);
        // __source.toFile(imgUrl);
        //uploading to cloudinary

        // async.map(files, function (file, callback) {
        await cloudinary.uploader.upload(imgUrl, function (error, response) {
            if (error) {
                console.log(error);
            }
            console.log("response cloudinary", response);

            cloudinaryUrl = response.url;
            console.log("cloudinaryUrl", cloudinaryUrl);
            console.log("Image uploaded ", response);
        });
    }
    console.log("outside", cloudinaryUrl);
    FeedModel.create({
        name: fullname,
        email: userEmail,
        post: userPost,
        imageUrl: cloudinaryUrl
    }, function (error, data) {
        if (error) console.log("FAiled to save post to database. Error", error);
        console.log("added to database", data);
    });
    FeedModel.find({ email: userEmail }, function (error, data) {
        if (error){
            console.log(error);
        } 
        // console.log(data);
    });
    return res.redirect('/');
};

//For like and dislike
FeedController.likeDislike = function (req, res) {
    var uName = req.session.user;
    console.log("seesion ka useremail>>", uName);
    var likeCount;
    var id = req.params.id
    console.log("yh like controller k andr ka paramsid h>>>", req.params.id);
    console.log("yh like controller k andr ka params id h jo j query se aya h>>>", id);

    FeedModel.findById(id, function (error, data) {  //here i get post data
        if (error) {
            console.log(error);
            return error;
        }
        // post id data got by req.params.id
        console.log("Liked Post", data);
        // var flag = 0;
        if(data.likedBy===null || data.likedBy.includes(uName)===false){
            FeedModel.findByIdAndUpdate(req.params.id, { $push: { likedBy: uName } }, function(err, docs){
                if(err){
                    return console.log("like update m error>>", err)
                }
                console.log("like hone k bad>>",docs);
                var flag = 1;
                return res.send({
                    flag: flag
                });
            });
        }
        var checking = data.likedBy.includes(uName);

        if(checking===true){
            FeedModel.findByIdAndUpdate(req.params.id, { $pull: { likedBy: uName } }, function(err, docs){
                if(err){
                    return console.log("like update m error>>", err)
                }
                console.log("like hone k bad>>",docs);
                console.log("you already liked this");
                var flag = 0;
                return res.send({
                    flag: flag
                });
            }); 
        }
    });
}
module.exports = FeedController;