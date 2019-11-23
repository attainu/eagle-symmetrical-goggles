const User = require('../models/Users.js');

const FollowController =  {};

// follow unfollow
FollowController.addFollowing = (req, res, next) => {
    console.log("this works-1");
    var followId = req.body.email;
    var myId = req.session.user;
    User.findOneAndUpdate({email: myId}, { $push: { following: followId } }, {useFindAndModify: false}, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ error: error });
        }
        next();
    });
};

FollowController.addFollower = (req, res) => {
    console.log("this works-2");
    var followId = req.body.email;
    console.log(followId);

    var myId = req.session.user;
    User.findOneAndUpdate({email: followId}, { $push: { followers: myId } }, {useFindAndModify: false}, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
};

// remove follow unfollow
FollowController.removeFollowing = (req, res, next) => {
    console.log("this works-3");

    var unfollowId = req.body.email;
    var myId = req.session.user;
    User.findOneAndUpdate({email: myId}, { $pull: { following: unfollowId } }, {useFindAndModify: false}, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

FollowController.removeFollower = (req, res) => {
    console.log("this works-4");

    var unfollowId = req.body.email;
    var myId = req.session.user;
    User.findOneAndUpdate({email: unfollowId}, { $pull: { followers: myId } }, {useFindAndModify: false}, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
};

module.exports = FollowController;
