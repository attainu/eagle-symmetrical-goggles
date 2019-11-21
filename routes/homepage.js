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
    }, function (error, data) {
        if (error) console.log("FAiled to save post to database. Error", error);

        console.log("added to database", data);
    });
    // FeedModel({
    //     name: "afroz",
    //     post: userPost,
    //     imageUrl: imgUrl
    // }).save(function (error, data) {
    //     if (error) {
    //         console.log("Error", error);
    //         return res.status(500).send({
    //             status: false,
    //             message: "FAiled to save post to database"
    //         });
    //     }
    //     console.log("added to database", data);
    //     // return res.render('homepage', {
    //     //     status: true,
    //     //     userData: data
    //     // });
    // });
    FeedModel.find({}, function (error, data) {
        if (error) {
            console.log(error);

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
// //For like and dislike
// FeedController.likedislike = function (req, res) {
//     console.log("req.params.id:", req.params.id);

//     FeedModel.findById(req.params.id, function (error, data) {
//         if (error) {
//             console.log(error);
//             return res.send(error);
//         }
//         data.likes += 1;
//         console.log("from likedislike", data);

//         data.save(function (err) {
//             if (error) return res.status(500).send(error);
//             console.log("no. of likes", data.likes);
//             return res.send({
//                 likeCount: data.likes
//             });
//         });
//     });
// };
module.exports = FeedController;
