const FeedController = {};
const FeedModel = require('./../models/Homepage.js');


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

FeedController.addPost = function (req, res) {
    var userPost = req.body.usersPost;
    console.log("POST>>", typeof userPost);
    var imgUrl = null;
    if(req.files['imagefile']){
        imgUrl= req.files['imagefile'][0].path;
        console.log("url>>", imgUrl);
    }
    FeedModel({
        name: "afroz",
        post: userPost,
        imageUrl: imgUrl.replace("public/","")
    }).save(function (error, data) {
        if (error) {
            console.log("Error",error);
            return res.status(500).send({
                status: false,
                message: "FAiled to save post to database"
            });
        }
        console.log("added to database",data);
        
        // return res.render('homepage', {
        //     status: true,
        //     userData: data
        // });
    });
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
module.exports = FeedController;